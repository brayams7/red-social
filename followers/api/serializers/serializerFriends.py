from users.models import Followed, User
from rest_framework import serializers

class ListFriendsSerializers(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField(max_length = 50)

    def to_representation(self, instance):
        return{
            'id':instance[0],
            'username':instance[1]
        }

class ListFollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followed
        fields = ['profile']
    
    def to_representation(self, instance):
        print(instance)
        return{
            'id':instance.profile.id,
            'username':instance.profile.user.username
        }

class ListFollowedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

    def to_representation(self, instance):
        return{
            'id':instance[0],
            'username':instance[1]
        }