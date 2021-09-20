from django.db import models
from rest_framework import serializers
from users.models import User, Profile
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Profile.objects.create(user=user, rol_id=2, biograpy="agregar biograpy")
        return user
    
    #crear un nuevo serializador para la edicion que incluya la tabla de usuario y perfil (tomar como referencia la de user)
    def update(self,instance, validated_data):  
        user_updated = super().update(instance, validated_data)
        if "password" in validated_data:
            user_updated.set_password(validated_data.get('password'))
        user_updated.save()
        return user_updated


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['is_staff','groups','user_permissions','last_login','password']


class UpdateProfileSerializer(serializers.ModelSerializer):
    biograpy = serializers.CharField(max_length=255)
    phone_number = serializers.CharField(max_length=20)
    class Meta:
        model = User
        exclude = ['is_staff','groups','user_permissions','last_login','password','is_superuser','username']
    
    def validate_phone_number(self, value):
        regex_number = "^[0-9]$"
        patron = re.compile(regex_number)
        if patron.search(value) is None:
            raise serializers.ValidationError('Este no es un numero de telefono')
        return value

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        profile = self.context.get('profile')
        if profile:
            profile.biograpy = validated_data.get('biograpy', profile.biograpy)
            profile.phone_number = validated_data.get('phone_number', profile.phone_number)
            profile.save()

        return user
    
class RetrieveUserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField("getUsername")
    name = serializers.SerializerMethodField("getName")
    last_name = serializers.SerializerMethodField("getLast_name")

    class Meta:
        model = Profile
        exclude = ['state','created','modified','followers']

    def getUsername(self, obj):
        return obj.user.username
    
    def getName(self, obj):
        return obj.user.name

    def getLast_name(self, obj):
        return obj.user.last_name

class ChangePasswordSerialzier(serializers.ModelSerializer):
    old_password = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)
    password2 = serializers.CharField(max_length=50)

    def old_password(self, value):
        user = self.context.get('user')
        if not user.check_password(value):
            raise serializers.ValidationError("la contraseña no coincide")

        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coiciden")
        
        return data

    def save(self, validated_data):
        user = self.context.get('user')
        user.set_password(validated_data.get('password'))
        user.save()
        print('contraseña cambiado')

class ChangePictureSerializer(serializers.ModelSerializer):
    picture = serializers.CharField(max_length=200)
        
class UserProfileListSerializer(serializers.ModelSerializer):
    biograpy = serializers.CharField(max_length=255)
    class Meta:
        model = User
        exclude = ['is_staff','groups','user_permissions','last_login','password']

class CustomFistProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['rol','changed_first_profile','user']


        

    