from rest_framework.routers import DefaultRouter
from users.api.views.userViewset import (ProfileModelViewSet, 
                            PruebaUser)
from users.api.views.config.password import PasswordUserVIewSet
from posts.api.views.posts import PostVIewSet
from posts.api.views.Comments import CommentsViewSet
from posts.api.views.stories import StoryVIewSet
from followers.api.views.followersViewSet import FollowersViewSet
router = DefaultRouter()
#my viewsets
router.register(r'profile', ProfileModelViewSet, basename = 'profile')
router.register(r'posts', PostVIewSet, basename = 'posts')
router.register(r'stories', StoryVIewSet, basename = 'stories')
router.register(r'followers', FollowersViewSet, basename = 'followers')
router.register(r'prueba', PruebaUser, basename = 'prueba')
router.register(r'comments', CommentsViewSet, basename = 'comments')

#config user
router.register(r'config-password-user', PasswordUserVIewSet, basename = 'config-password-user')

urlpatterns = router.urls

