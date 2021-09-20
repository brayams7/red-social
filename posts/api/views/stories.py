from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from posts.models import Stories
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from permissions import UpdateProfile


class StoryVIewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]

    queryset = Stories.objects.filter(state=True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action != "list":
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,UpdateProfile]

        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ListPostSerializer
        else:
            return PostSerializer

    