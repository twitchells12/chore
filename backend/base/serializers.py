from rest_framework import serializers

# from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Project, Employee


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "isAdmin",
            "phone",
            "company",
            "position",
        ]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email

        return name


class EmployeeSerializerWithToken(EmployeeSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "isAdmin",
            "token",
            "phone",
            "company",
            "position",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
