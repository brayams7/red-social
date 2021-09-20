from django.urls import path
from users.api.views.userViewset import user_api_view, user_datail_api_view
from users.api.views.request_profile import Dashboard_Profile, Get_user_profile
urlpatterns =[
    path('user/',user_api_view, name="user_api_view"),
    path('user/<int:pk>',user_datail_api_view, name="user_detail_api_view"),
    path('user/profile/dashboard/', Dashboard_Profile.as_view(), name="user_profile_dashboard"),
    path('user/profile/get_user_profile_dashboard/<str:pk>/', Get_user_profile.as_view(), name="get_user_profile_dashboard")
]