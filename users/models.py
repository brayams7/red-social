from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db.models import base
from simple_history.models import HistoricalRecords
from base.models import BaseModel

class UserManager(BaseUserManager):
    def _create_user(self, username, email, name,last_name, password, is_staff, is_superuser, **extra_fields):
        user = self.model(
            username = username,
            email = email,
            name = name,
            last_name = last_name,
            is_staff = is_staff,
            is_superuser = is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, username, email, name,last_name, password=None, **extra_fields):
        return self._create_user(username, email, name,last_name, password, False, False, **extra_fields)

    def create_superuser(self, username, email, name,last_name, password=None, **extra_fields):
        return self._create_user(username, email, name,last_name, password, True, True, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length = 255, unique = True)
    email = models.EmailField('Correo Electrónico',max_length = 255, unique = True,)
    name = models.CharField('Nombres', max_length = 255, blank = True, null = True)
    last_name = models.CharField('Apellidos', max_length = 255, blank = True, null = True)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    historical = HistoricalRecords()
    objects = UserManager()

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','name','last_name']

    def __str__(self):
        return f'{self.name} {self.last_name}'

class Rol(BaseModel):
    description = models.CharField(max_length=50)

class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    biograpy = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    picture = models.ImageField(upload_to='images', blank=True, null=True)
    changed_first_profile = models.BooleanField(default=False)
    followers = models.ManyToManyField(User, through="Followed")
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)


class Followed(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followed_user")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="profile_followed")
    is_followed = models.BooleanField(default=False)
    accepted = models.BooleanField(default=True)


