from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
status = (
    ("Active", "Active"),
    ("Complete", "Complete"),
    ("On Hold", "On Hold"),
    ("Past Due", "Past Due"),
)

comp = (
    ("Company 1", "Company 1"),
    ("Company 2", "Company 2"),
    ("Company 3", "Company 3"),
    ("Company 4", "Company 4"),
)
comp2 = (
    ("Company A", "Company A"),
    ("Company B", "Company B"),
    ("Company C", "Company C"),
    ("Company D", "Company D"),
)


# def get_attachment_upload_dir(instance, filename):
#     return "/".join(["projects", "attachments", str(instance.project.id), filename])


class Employee(AbstractUser):
    phone = models.CharField(max_length=12, blank=True, null=True)
    company = models.CharField(max_length=100, choices=comp, blank=True, null=True)
    position = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return self.last_name + ", " + self.first_name


class Customer(models.Model):
    first_name = models.CharField(max_length=12, blank=True, null=True)
    last_name = models.CharField(max_length=12, blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    phone = models.CharField(max_length=12, blank=True, null=True)
    company = models.CharField(max_length=100, choices=comp2, blank=True, null=True)
    position = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return self.last_name + ", " + self.first_name


class Project(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=256, blank=True, null=True)
    employee = models.ForeignKey(Employee, null=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, null=True, blank=True, on_delete=models.SET_NULL
    )
    description = models.TextField(blank=True, null=True)
    lat = models.DecimalField(max_digits=10, decimal_places=3, blank=True, null=True)
    lon = models.DecimalField(max_digits=10, decimal_places=3, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True, blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=status, blank=True, null=True)
    completed_on = models.DateField(blank=True, null=True)
    completed = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return str(self._id)


class Comment(models.Model):
    title = models.CharField(max_length=256, blank=True, null=True)
    project = models.ForeignKey(
        Project, null=True, on_delete=models.CASCADE, related_name="comments"
    )
    author = models.ForeignKey(
        Employee, related_name="author", null=True, on_delete=models.CASCADE
    )
    text = models.CharField(max_length=256, blank=True, null=True)
    approved_comment = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.title
