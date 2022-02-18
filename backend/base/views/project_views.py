from django.core.checks import messages
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from datetime import datetime

from base.models import Project
from base.serializers import ProjectSerializer

from rest_framework import status


# ------------Project views----------------


@api_view(["GET"])
def getProjects(request):
    query = request.query_params.get("keyword")
    print("query", query)
    if query == None:
        query = ""
    projects = Project.objects.filter(title__icontains=query)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProject(request, pk):
    project = Project.objects.get(_id=pk)
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProject(request):
    user = request.user
    project = Project.objects.create(
        created_by=user, project_name="Project Title", description="Project Description"
    )

    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def updateProject(request, pk):
    data = request.data
    project = Project.objects.get(_id=pk)
    project.title = data["title"]
    project.description = data["description"]
    project.lat = data["lat"]
    project.lon = data["lon"]
    # project.customer = data["customer"]
    # project.employee = data["employee"]
    project.due_date = data["dueDate"]
    project.status = data["status"]
    project.completed_on = data["completedDate"]

    project.save()

    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProject(request, pk):
    project = Project.objects.get(_id=pk)
    project.delete()
    return Response("Project Deleted")