from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from posts.models import Post
from users.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from permissions import UpdateProfile
from users.api.serializers.user_serializers import RetrieveUserProfileSerializer
from django.shortcuts import get_object_or_404
from rest_framework import generics

class Dashboard_Profile(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, UpdateProfile]

    #@action(methods=['get'], detail=False) list
    def get(self, request, *args,**kwargs):
        profile = request.user.user_profile
        followed = profile.followers.count() #seguidos

        followers = request.user.followed_user.count() #seguidores

        posts = Post.objects.filter(state=True, profile=profile).count() #publicaciones

        instance = self.request.user.user_profile
        serializer = RetrieveUserProfileSerializer(instance)

        return Response({
            'followed':followed,
            'followers': followers,
            'posts':posts,
            'profile':serializer.data
        }, status=status.HTTP_200_OK)

class Get_user_profile(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(is_active=True)

    def get_serializer_class(self):
        return RetrieveUserProfileSerializer

    def retrieve(self, request, pk):
        mi_profile = request.user.user_profile
        mi_user = mi_profile.user
        user =  User.objects.filter(username=pk).first()
        
        if user:
            profile = user.user_profile
            followed = profile.followers.count() #seguidos
            followers = request.user.followed_user.count() #seguidores
            posts = Post.objects.filter(state=True, profile=profile).count() #publicaciones

            seguidor = mi_profile.followers.filter(id = user.id).exists()
            seguido = mi_user.followed_user.filter(profile = profile).exists()
            
            serializer = RetrieveUserProfileSerializer(profile)

            return Response({
                'followed':followed,
                'followers': followers,
                'posts':posts,
                'profile':serializer.data,
                'seguidor_o_seguido':{
                    'seguidor': seguidor,
                    'seguido':seguido,
                    'is_my_count': True if mi_profile.user == profile.user else False 
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'Not found':'No existe el usuario'
            }, status = status.HTTP_404_NOT_FOUND)
        

    