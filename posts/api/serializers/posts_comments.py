from rest_framework import serializers
from posts.models import Comments, Post
from django.shortcuts import get_object_or_404

class ListCommentsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        exclude = ['state','created','modified']

    def to_representation(self, instance):
        return{
            'id':instance.id,
            'profile':{
                'id':instance.profile.id,
                'username':instance.profile.user.username
            },
            'message':instance.message,
            'likes':instance.likes
        }
    

class CommentsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields =  ['post','profile','message']

    def create(self, validated_data):
        comment = Comments(**validated_data)
        comment.save()
        return comment
    
    def update(self, instance, validated_data):
        instance.message = validated_data.get('comment', instance.message)
        instance.save()
        return instance

