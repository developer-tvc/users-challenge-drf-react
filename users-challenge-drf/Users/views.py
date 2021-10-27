from django.shortcuts import render
from .serializers import UserRegister
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserDataSerializer
from django.http import Http404


# Create your views here.
#   ADD USER
class RegisterView(APIView):
    def post(self, request, format=None):
        serializer = UserRegister(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'registered'
            data['name'] = account.first_name
            data['username'] = account.username
            data['superuser'] = account.is_superuser
            data['staff'] = account.is_staff
            data['active'] = account.is_active
            data['id'] = account.pk
        else:
            data = serializer.errors
        return Response(data)


#   LIST USERS
class ListUsers(APIView):
    def get(self, request):
        users_list = User.objects.all()
        serializer = UserRegister(users_list, many=True)
        return Response(serializer.data)


#   SHOW SPECIFIC USER DETAILS
class UserDetails(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404

    def get(self, request, pk, format=None):
        userData = self.get_object(pk)
        serializer = UserDataSerializer(userData)
        return Response(serializer.data)


#   DELETE USER
class DeleteUser(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404

    def delete(self, request, format=None):
        list = request.data["list"]
        for pk in list:
            userData = self.get_object(pk)
            userData.delete()
        return Response({'message': "user deleted"})


#   DEACTIVATION
class UserActivate(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404

    def put(self, request, format=None):
        list = request.data["list"]
        for pk in list:
            user_data = self.get_object(pk)
            user_data.is_active = 1
            user_data.save()
        return Response("successfully activated")


#   ACTIVATION
class UserDeactivate(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404

    def put(self, request, format=None):
        list = request.data["list"]
        for pk in list:
            print(pk)
            user_data = self.get_object(pk)
            user_data.is_active = 0
            user_data.save()
        return Response("successfully deactivated")
