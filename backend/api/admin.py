from django.contrib import admin
from .models import CV

class CVAdmin(admin.ModelAdmin):
    list_display = ['title','user','created_at']
    search_fields = ['title']

admin.site.register(CV, CVAdmin)