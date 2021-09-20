from rest_framework import serializers
from users.models import User
from django.core.mail import EmailMultiAlternatives
from instagram.settings.base import EMAIL_HOST_USER, SECRET_KEY
from django.template.loader import render_to_string
from django.utils import timezone
from datetime import timedelta
import jwt

class EmailForRecoverPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        user = User.objects.filter(is_active=True, email=value).first()
        if user:
            self.context['user'] = user
        else:
            raise serializers.ValidationError("el correo no existe")

        return value
    
    def save(self):
        self.send_email()

    def send_email(self):
        try:
            user = self.context.get('user')
            token = self.generated_token(user.id)
            content = render_to_string('bodyEmail.html',
                    {'url_token': "http://localhost:3000/#/change_password/{}".format(token), 'user': user})
            msg = EmailMultiAlternatives("Hola",content, EMAIL_HOST_USER, [user.email])
            msg.attach_alternative(content, "text/html")
            msg.send()
        except:
            raise serializers.ValidationError('No se puedo enviar el correo')


    def generated_token(self, id):
        expired = timezone.now() + timedelta(seconds = 120)
        token = jwt.encode({
            'id':id,
            'exp':int(expired.timestamp()),
            'type':'recoverd_password'
        }, SECRET_KEY, algorithm='HS256')
        return token

class UserChangePassword(serializers.Serializer):
    password = serializers.CharField(max_length=20, allow_blank=False)
    password_confirmation = serializers.CharField(max_length=20, allow_blank=False)

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError('Las contraseñas no son iguales')
        return data
    
    def create(self, validate_data):
        user = self.context['user']
        user.set_password(validate_data.get('password'))
        user.save()
        return user


class VerifyJWTSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate_token(self, data):
        try:
            payload = jwt.decode(data, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError('La verifiacion ha expirado')
        except jwt.PyJWKError:
            print(1)
            raise serializers.ValidationError('token invalido')

        if payload.get('type') != 'recoverd_password':
            print(2)
            raise serializers.ValidationError('token invalido')
        
        self.context['payload'] = payload 
        return data



    