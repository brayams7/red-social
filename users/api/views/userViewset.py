import re
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, action,  authentication_classes
from rest_framework.authtoken.models import Token
from users.models import User
from users.api.serializers.user_serializers import UserListSerializer,ChangePictureSerializer, ChangePasswordSerialzier, UserProfileListSerializer, UserSerializer, UpdateProfileSerializer, CustomFistProfileSerializer
from users.authentication_mixin import Authentication_Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from permissions import UpdateProfile
from django.core.files import File
import json
from django.db.models import F


class ObtainToken(Authentication_Token,APIView):
    #obtener el token para setearlo en el local storage
    def get(self, request, *args, **kwargs):
        try:
            token,_ = Token.objects.get_or_create(user = self.user)
        except:
            return Response({'error':'El usuario no existe'})
        
        user_serializer = UserSerializer(self.user)
        return Response({
                    'user':user_serializer.data,
                    'token':str(token.key)
                    })


@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_api_view(request):
    print('hola',request.user)
    #create
    if request.method == 'POST':
        serializer = UserSerializer(data =request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'creado':'se ha creado correctamente'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    #list
    elif request.method ==  'GET':
        users = User.objects.filter(is_active = True)
        serializer = UserListSerializer(users, many = True)
        return Response(serializer.data, status =status.HTTP_200_OK)

@api_view(['GET','PUT','DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, UpdateProfile])
def user_datail_api_view(request, pk=None):
    user = User.objects.filter(id=pk).first()

    if user:
        #retrieve
        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data, status =status.HTTP_200_OK)

        elif request.method == 'PUT':
            serializer = UserSerializer(user, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status =status.HTTP_200_OK)
            return Response(serializer.data, status =status.HTTP_200_OK)

        #delete
        elif request.method == 'DELETE':
            user.delete()
            return Response({'message':'Usuario Eliminado correctamente!'},status = status.HTTP_200_OK)

    return Response({'no existe':"el usuario no existe"}, status = status.HTTP_400_BAD_REQUEST)

class ProfileModelViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated,]

    def get_serializer_class(self):
        if self.action == 'update':
            return UpdateProfileSerializer
        else:
            return UserProfileListSerializer


    def get_queryset(self):
        if self.action == 'list':
            return User.objects.filter(is_active=True).annotate(biograpy = F('user_profile__biograpy'))
        else:
            return User.objects.filter(is_active=True)

    
    '''def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action is not "update":
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [UpdateProfile]  
        return [permission() for permission in permission_classes]
    '''
    
    @action(methods=["post"], detail=False)
    def update_fisrt_profile(self, request, *args, **kwargs):
        print(request.data)
        data = request.data
        #avatar = request.data.get('picture')
        #data = json.loads(request.data.get('data'))
        profile = self.request.user.user_profile

        serializer = CustomFistProfileSerializer(data=data)

        if serializer.is_valid():
            if data.get('picture'):
                profile.biograpy = data.get('biograpy', profile.biograpy)
                profile.phone_number = data.get('phone_number', profile.phone_number)
                profile.changed_first_profile = True

                if not profile.picture:
                    profile.picture = File(data.get('picture'))

                elif profile.picture:
                    profile.picture.delete()
                    profile.picture = File(data.get('picture'))
                profile.save()
                
                return Response({
                    'exito':'su perfil se ha sido personalizado'
                }, status = status.HTTP_200_OK)

            return Response({
                'error':'El usuario debe agregar una foto de perfil'
            }, status = status.HTTP_400_BAD_REQUEST)
            
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        

    def update(self, request, *args, **kwargs):
        #actualiza el perfil del usuario inlcuyendo la tabla de user
        user = self.get_object()
        profile = self.get_object().user_profile
        
        serializer = self.get_serializer(user, data=request.data, context = {'profile':profile})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def change_password(self, request, *args, **kwargs):
        #en este apartado será el cambio de contraseña 
        serializer = ChangePasswordSerialzier(data = request.data, context = {'user':request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)

        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def change_picture(self, request, *args, **kwargs):
        profile = request.user.user_profile
        serializer = ChangePictureSerializer(data = request.data)
        if serializer.is_valid():
            if profile.picture:
                profile.picture.delete()
            profile.picture = File(request.data.get('picture'))
            profile.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class PruebaUser(ModelViewSet):
    lookup_field = None
    queryset = User.objects.all()
    lookup_url_kwarg = 'username'

    def get_serializer_class(self):
        return UserSerializer
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        print(self.kwargs) 

    def retrieve(self, request, *args, **kwargs):
        self.get_object()
        print(args, kwargs)

    def list(self, request, *args, **kwargs):
        print('hola')
        print(kwargs)
    
    

