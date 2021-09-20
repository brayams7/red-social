from django.db import models
from django.db.models import fields
from rest_framework import serializers
from posts.models import Post, Comments, likesPost
from django.core.files import File
from django.db import transaction
from django.db.models import Count

class ListPostSerializer(serializers.ModelSerializer):
    comments = serializers.IntegerField(min_value=0)
    number_of_likes = serializers.SerializerMethodField("getNumber_of_likes")
    class Meta:
        model = Post
        fields = ['id','description','photo','comments','blockComments','number_of_likes']
        depth = 1

    def getNumber_of_likes(self, obj):
        return obj.likesPost_post.count()

        
class PostSerializer(serializers.ModelSerializer):
    tagFriends = serializers.CharField(max_length = 250, allow_blank=True)
    class Meta:
        model = Post
        fields = ['user','profile','description','photo','tagFriends','blockComments']
    
    def create(self, validated_data): 
        tagFriends = validated_data.get('tagFriends')
        print(tagFriends)
        with transaction.atomic():
            post = Post.objects.create(user = validated_data.get('user'),
                profile =  validated_data.get('profile'),
                description = validated_data.get('description'),
                photo  = File(validated_data.get('photo')),
                blockComments = validated_data.get('blockComments'), 
            )
            if tagFriends:
                ids = tagFriends.split(',')
                for id in ids:
                    post.tagFriends.add(int(id))   
            return post


class AddLikePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = likesPost
        exclude = ['state','created','modified']
    

    def save(self):
        post = self.context['post']
        if self.context['is_liked']:
            print('like true')
            if not post.likesPost_post.filter(profile = self.validated_data.get('profile')).exists():
                likePost = likesPost(**self.validated_data)
                likePost.save()
        
        else:
            print('like false')
            likePost = post.likesPost_post.filter(profile = self.validated_data.get('profile')).first()
            if likePost:
                likePost.delete()

    def create(self, validated_data):
        likePost = likesPost(**validated_data)
        likePost.save()
        return likePost

class listLikesPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = likesPost
        exclude = ['state','created','modified']
    
    def to_representation(self, instance):
        return{
            'username':instance.profile.user.username,
            'id':instance.profile.user.id
        }

class PostCommentsListSerializer(serializers.ModelSerializer):
    #trae todos los comentarios con su respetiva publicacion
    class Meta:
        model = Comments
        fields = '__all__'
        depth = 1