from django.urls import path
from base.views import project_views as views


urlpatterns = [
    path("", views.getProjects, name="projects"),
    path("create/", views.createProject, name="project-create"),
    path("<str:pk>/", views.getProject, name="project"),
    path("delete/<str:pk>/", views.deleteProject, name="project-delete"),
    path("update/<str:pk>/", views.updateProject, name="project-update"),
]
