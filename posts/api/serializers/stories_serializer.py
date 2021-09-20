from django.db.models import fields
from rest_serializer import serializers
from posts.models import Stories
from django.core.files import File

class StoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stories
        fields = ['state','created','modified']

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Stories
        fields = ['state','created','modified']

    def create(self, validated_data): 
        story = Stories.objects.create(user = validated_data.get('user'),
            profile =  validated_data.get('profile'),
            photo  = File(validated_data.get('photo')),
            likes  = validated_data.get('likes'),
            views = validated_data.get('views')
        )
        return story
