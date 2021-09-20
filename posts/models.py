from django.db import models
from django.db.models.fields import CharField
from base.models import BaseModel
from users.models import Profile, User
# Create your models here.

class Post(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_post')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_post')
    description = models.CharField(max_length=200, blank=True, null=True)
    photo = models.ImageField(upload_to="posts")
    likes = models.IntegerField(default=0)      
    tagFriends = models.ManyToManyField(User, through='TagFriends')
    blockComments = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.id)

class TagFriends(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_tagFriends')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_tagFriends')


class Comments(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments_posts')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_commentsPost', null=True)
    message = models.CharField(max_length=255)
    likes =   models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.message

class likesPost(models.Model): 
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likesPost_post', default=1)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_likesPost')
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.profile.user.username


class Stories(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_stories')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_stories')
    photo = models.ImageField(upload_to="stories")
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.user.username

    