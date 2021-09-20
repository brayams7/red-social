from rest_framework import permissions

class UpdateProfile(permissions.BasePermission):
    def has_object_permission(self, request, view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id

class LikePostPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        print('pasó')
        if request.user.id == int(request.data.get('user')):
            return True
        return False

class RecoveerdPasswordPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        email = request.data.get('email')
        return request.user.email == email

