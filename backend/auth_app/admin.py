from django.contrib import admin


# regiser User Model
from .models import User

# we need to show username and email in the admin panel
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    search_fields = ['username', 'email']

admin.site.register(User, UserAdmin)
