from users.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from posts.models import Comments, Post, likesPost
from posts.api.serializers.posts_serializers import listLikesPostSerializer, PostSerializer, ListPostSerializer, AddLikePostSerializer
from posts.api.serializers.posts_comments import ListCommentsPostSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.db.models import Count
from permissions import UpdateProfile, LikePostPermission
from django.shortcuts import get_object_or_404

class PostVIewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]

    queryset = Post.objects.filter(state=True)

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
    
    def list(self, request, *args,**kwargs):
        list = self.queryset.filter(profile = request.user.user_profile).annotate(comments= Count('comments_post__id'))
        #ids_posts = list.values_list('id')
        #comments = Comments.objects.filter(state=True, post_id__in = ids_posts)
        #print(list,ids_posts, comments)
        queryset = self.filter_queryset(list)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        #lista de los posts
        serializer = self.get_serializer(queryset, many=True)

        '''queryset_comments = self.filter_queryset(comments)

        page_comments = self.paginate_queryset(queryset_comments)
        if page_comments is not None:
            serializer_comments = self.get_serializer(page_comments, many=True)
            return self.get_paginated_response(serializer_comments.data)

        #lista de los comentarios
        serializer_comments = PostCommentsListSerializer(queryset_comments, many=True)
        print(serializer.data)
        print(serializer_comments.data)
        '''
        return Response({
            'posts':serializer.data,
            #'comments':serializer_comments.data
        })

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.user.id
        data['profile'] = request.user.user_profile.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(methods=['get'], detail=True)
    def get_posts_user(self, request, pk):
        user = get_object_or_404(User, username=pk)
        if user:
            list = self.queryset.filter(profile = user.user_profile).annotate(comments= Count('comments_posts__id'))
            print(list)
            queryset = self.filter_queryset(list)

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = ListPostSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            #lista de los posts
            serializer = ListPostSerializer(queryset, many=True)
            
            return Response({
                'posts':serializer.data,
            })
        else:
            return Response({
                'errros':'No existe el usuario',
            }, status = status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['get'], detail=True)
    def get_comments_post(self, request, pk):
        if int(pk):
            comments = Comments.objects.filter(post__id = pk)
            queryset = self.filter_queryset(comments)

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = ListCommentsPostSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            #lista de los comentarios de un post
            serializer = ListCommentsPostSerializer(queryset, many=True)
                
            return Response({
                'comments':serializer.data,
            })

        return Response({
            'error':'error de parametro'
        }, status= status.HTTP_404_BAD_REQUEST) 
    
    @action(methods=['get'], detail=True)
    def get_likes_posts(self, request, pk):
        if int(pk):
            likesPosts = likesPost.objects.filter(post__id = int(pk))
            is_liked_for_me = likesPosts.filter(profile__id = request.user.user_profile.id).exists()
            queryset = self.filter_queryset(likesPosts)

            serializer = listLikesPostSerializer(queryset, many=True)
                
            return Response(
                {
                    'data':serializer.data,
                    'is_liked_for_me':is_liked_for_me
                }
            ,
            status=status.HTTP_200_OK)

        return Response({
            'error':'error de parametro'
        }, status= status.HTTP_404_BAD_REQUEST) 
    
    @action(methods=['post'], detail=True, permission_classes=[IsAuthenticated, LikePostPermission])
    def add_like_post(self, request, pk=None):
        post = self.get_object()
        is_liked = None
        if post:
            data = request.data
            try:
                data['post'] = post.id
                if int(data.get('profile')) == request.user.id:
                    data['profile'] = request.user.user_profile.id
                is_liked = data.pop('like')
            except:
                return Response(
                    {
                        'error':'falta el campo de like'
                    },
                    status = status.HTTP_404_BAD_REQUEST
                )
            print('data',data)
            serializer = AddLikePostSerializer(data=data, context={'is_liked':is_liked,'post':post})
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'response':serializer.data},
                    status = status.HTTP_200_OK
                )
        return Response(
            {
                'error':'not defined post'
            },
            status = status.HTTP_404_BAD_REQUEST
            )
    def update(self, request, *args, **kwargs):
        pass

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def perform_destroy(self,instance):
        instance.state = False
        comments = instance.comments_post.all()
        
        for comment in comments:
            comment.state = False
            comment.save()

        instance.save()