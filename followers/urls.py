from django.urls import path
from followers.api.views.followersViewSet import ListFollowedAPiView,ListFollowersApiView
urlpatterns =[
    path('followers/',ListFollowersApiView.as_view(), name="followers"),
    path('followed/',ListFollowedAPiView.as_view(), name="followed"),
]