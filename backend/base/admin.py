from django.contrib import admin

from .models import Customer, Employee, Project, Comment

# class CustomUserAdmin(UserAdmin):
#     ...
#     fieldsets = UserAdmin.fieldsets + (
#         (None, {'fields': ('custom_field',)}),
#     )
#     add_fieldsets = UserAdmin.add_fieldsets + (
#         (None, {'fields': ('custom_field',)}),
#     )


# Register your models here.

admin.site.register(Project)
admin.site.register(Customer)
admin.site.register(Employee)

admin.site.register(Comment)