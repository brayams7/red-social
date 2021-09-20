from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from users.models import User
from users.api.serializers.config.passwordSerializer import EmailForRecoverPasswordSerializer, UserChangePassword, VerifyJWTSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from permissions import RecoveerdPasswordPermission

class PasswordUserVIewSet(ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    
    def get_serializer_class(self):
        return EmailForRecoverPasswordSerializer
    
    @action(methods=['post'], detail=False)
    def email_recoverd_password(self, request):

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'exito':'se envió un mensaje a su correo'
                }
            ,
            status=status.HTTP_200_OK)

        return Response({
            'error':serializer.errors
        }, status= status.HTTP_400_BAD_REQUEST) 
    
    @action(methods=['post'], detail=False)
    def recoverd_password(self, request):
        serializer = VerifyJWTSerializer(data={'token':request.data.get('token')})
        if serializer.is_valid():
            payload = serializer.context.get('payload')
            user = self.queryset.filter(id=payload['id']).first()
            if user:
                valido = self.change_password(
                    {'password':request.data.get('password'),'password_confirmation':request.data.get('password_confirmation')},
                        user)
                if valido:
                    return Response(
                    {
                        'exito':'cambio de contraseña con éxito'
                    }, status=status.HTTP_200_OK)
                else:
                    Response(
                        valido
                    , status= status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error user':"el usuario no existe"}, status= status.HTTP_404_BAD_REQUEST)
        else:
            return Response(
                serializer.errors
            , status= status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        user = self.get_object()
        self.change_password(request.data, user)

    
    def change_password(self, data, user):
        serializer = UserChangePassword(data=data, context={'user':user})
        if serializer.is_valid():
            serializer.save()
            return True
        else:
            return  serializer.errors