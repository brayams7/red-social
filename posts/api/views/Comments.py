from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from posts.models import Comments
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from posts.api.serializers.posts_comments import CommentsPostSerializer

class CommentsViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    queryset = Comments.objects.filter(state=True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        if self.action == 'create' or self.action=='update':
            return CommentsPostSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        data['profile'] = request.user.user_profile.id
        data['post'] = data['post']
        print(data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

