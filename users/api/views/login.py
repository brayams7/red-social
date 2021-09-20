from typing import IO
from django.contrib.sessions.models import Session
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
from users.api.serializers.user_serializers import UserListSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class Login(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request,*args,**kwargs):
        print(request.data)
        serializer = self.get_serializer(data = request.data, context = request)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            userSerializer = UserListSerializer(user)
            if user.is_active:
                token, created = Token.objects.get_or_create(user = user)
                if created:
                    print(user)
                    return Response({'exito':'el haz iniciado sesión correctamente',
                                    'token':str(token.key),
                                    'user':userSerializer.data,
                                    'changed_first_profile':user.user_profile.changed_first_profile
                                    },
                                    status = status.HTTP_200_OK)
                else:
                    token.delete()
                    return Response({'exito':'tu ya iniciaste sesion'},
                                    status = status.HTTP_409_CONFLICT)
            else:
                return Response({'error':'usuario inactivo'},
                                    status = status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error':'error al iniciar sesion'},
                                    status = status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        #el token se envia en el query_params
        try:
            token = request.GET.get('token')
            token = Token.objects.filter(key=token).first()
            if token:
                user = token.user
                all_sessions = Session.objects.filter(expire_date__gte = timezone.now())
                if all_sessions.exists():
                    for session in all_sessions:
                        session_data = session.get_decoded()
                        if user.id == int(session_data.get('_auth_user_id')):
                            session.delete()
                session_message = 'Sesiones de usuaiors eliminadas'

                token.delete()
                token_message = 'token eliminado'

                return Response({
                    'token_message':token_message,
                    str(session_message): session_message
                }, status = status.HTTP_200_OK)
            return Response({
                'error':'No se ha encontrado un usuario con estas credenciales'
            }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                'error':'No se ha encontrado un token en la peticion'
            }, status=status.HTTP_400_BAD_CONFLICT)