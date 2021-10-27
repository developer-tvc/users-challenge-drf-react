from django.urls import path
from Users.views import RegisterView
from Users.views import ListUsers
from Users.views import UserDetails
from Users.views import UserActivate
from Users.views import DeleteUser
from Users.views import UserDeactivate

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users-list/', ListUsers.as_view(), name='users_list'),
    path('user-details/<int:pk>/', UserDetails.as_view(), name="user_details"),
    path('user-activate/', UserActivate.as_view(), name="user_activate"),
    path('user-deactivate/', UserDeactivate.as_view(), name="user_deactivate"),
    path('delete-user/', DeleteUser.as_view(), name="user_activate"),
]
