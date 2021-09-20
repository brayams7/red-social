from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token


class CheckingToken(TokenAuthentication):
    model = Token

    def authenticate_credentials(self, key):
        user,token = None,None
        error = None
        try:
            token = self.get_model().objects.get(key=key)
            user = token.user
        except self.get_model().DoesNotExist:
            error = "Token invalido"

        return (user,error)