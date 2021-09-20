from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer

from users.authentication import CheckingToken

class Authentication_Token(object):
    user = None

    def get_user(self, request):
        key_token = get_authorization_header(request).split()
        if key_token:
            try:
                key_token = key_token[1].decode()
            except:
                return None

            valitation_token = CheckingToken()
            user,error = valitation_token.authenticate_credentials(key_token)
            print(error)
            if user != None and error == None:
                self.user = user
                return user

            return error

        return None

    def dispatch(self, request, *args, **kwargs):
        # antes de proseguir con la ejecucion de la peticion hacemos la validacion de token y usuario
        user_or_message = self.get_user(request)

        if user_or_message is not None:
            if type(user_or_message) == str:
                response = Response({'error': str(user_or_message), 'token':False}, status=status.HTTP_401_UNAUTHORIZED)
                response.accepted_renderer = JSONRenderer()
                response.accepted_media_type = 'application/json'
                response.renderer_context = {}
                return response
            else:
                return super().dispatch(request, *args, **kwargs)

        response = Response({'error': 'no se han enviado las credenciales','token':False}, status=status.HTTP_400_BAD_REQUEST)
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = 'application/json'
        response.renderer_context = {}
        return response
