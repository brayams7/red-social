from users.api.views.userViewset import user_api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action,  authentication_classes
from users.models import Followed, User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from followers.api.serializers.serializerFriends import ListFriendsSerializers, ListFollowedSerializer, ListFollowersSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView

class ListFollowersApiView(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated,]
    filter_backends = [DjangoFilterBackend]
    #filterset_fields = ['user__username']
    filterset_fields={
        'user__username':['contains'],
    }


    def get_queryset(self):
        return Followed.objects.filter(state = True)

    def get_serializer_class(self):
        return ListFollowersApiView

    def list(self, request):
        #devuelve mis amigos (que yo los siga y que ellos me sigan)
        friends = request.user.followed_user.filter(state=True)
        queryset = self.filter_queryset(friends)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ListFollowersSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ListFollowersSerializer(queryset, many=True)
        return Response(serializer.data)

class ListFollowedAPiView(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated,]
    filter_backends = [DjangoFilterBackend]
    #filterset_fields = ['username']
    filterset_fields = {
        'username':['contains'],
    }
    def get_queryset(self):
        return User.objects.filter(state = True)

    def get_serializer_class(self):
        return ListFollowedSerializer

    def list(self, request):
        #devuelve mis amigos (que yo los siga y que ellos me sigan)
        profile = request.user.user_profile

        friends = profile.followers.filter(is_active = True).values_list('user_profile__id','username')
        queryset = self.filter_queryset(friends)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class FollowersViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated,]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user__username']

    def get_queryset(self):
        return Followed.objects.filter(state = True)

    def get_serializer_class(self):
        return ListFriendsSerializers

    @action(methods=['get'], detail = False)
    def listFollowers(self, request):
        #devuelve mis amigos (que yo los siga y que ellos me sigan)
        friends = request.user.followed_user.filter(state=True)
        queryset = self.filter_queryset(friends)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ListFollowersSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ListFollowersSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail = False)
    def listFollowed(self, request):
        #devuelve mis amigos (que yo los siga y que ellos me sigan)
        profile = request.user.user_profile

        friends = Followed.objects.filter(state=True,profile = profile, user = request.user).values_list('user__profile__id','user__username')
        queryset = self.filter_queryset(friends)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ListFollowedSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ListFollowedSerializer(queryset, many=True)
        return Response(serializer.data)