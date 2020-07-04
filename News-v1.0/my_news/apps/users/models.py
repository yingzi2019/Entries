from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from utils.basic_model import BasicTime


class CustomizeUser(AbstractUser, BasicTime):
    mobile = models.CharField(max_length=11, min_length=11)

    class Meta:
        db_table = "tb_user"
        verbose_name = verbose_name_plural = "用户"

    def __str__(self):
        return self.username