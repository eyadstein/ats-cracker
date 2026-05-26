from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save

from api.models import CV

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


def create_user(sender, instance, created, **kwargs):
    """
    When User Is Create We Create Default Cv For User

    :param sender:
    :param instance:
    :param created:
    :param kwargs:
    :return:
    """
    if created:
        # read data from cv_1.json
        with open("default_cvs/cv_1.json", "r") as f:
            data = f.read()

        cv = CV.objects.create(user=instance, title="Example", data=data)
        cv.save()

post_save.connect(create_user, sender=User)
