from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegister(serializers.ModelSerializer):
    # name = serializers.CharField(style={'input_type': 'text'}, write_only=True)
    id = serializers.CharField(read_only=True)
    class Meta:
        model = User
        fields = ["id","first_name", "username", "is_superuser", "is_staff", "is_active"]

    def save(self):
        reg = User(
            first_name=self.validated_data['first_name'],
            username=self.validated_data['username'],
            is_superuser=self.validated_data['is_superuser'],
            is_staff=self.validated_data['is_staff'],
            is_active=self.validated_data['is_active'],
        )
        reg.save()
        return reg


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id","first_name", "username", "is_superuser", "is_staff", "is_active"]
