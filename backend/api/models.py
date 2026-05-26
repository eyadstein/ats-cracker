from django.db import models

class CV(models.Model):
    user = models.ForeignKey('auth_app.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)