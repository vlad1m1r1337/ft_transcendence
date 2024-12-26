from django.db import models
from .managers import IntraUserManager

class IntraUser(models.Model):
    objects = IntraUserManager()
    id = models.BigIntegerField(primary_key=True)
    intra_login = models.CharField(max_length=8)
    avatar = models.CharField(max_length=100)
    wallet = models.IntegerField(default=0)
    last_login = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    def is_authenticated(self):
        return True
    def __str__(self):
        return self.intra_login
