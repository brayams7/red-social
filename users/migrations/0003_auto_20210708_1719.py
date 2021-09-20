# Generated by Django 3.2.3 on 2021-07-08 15:19

from django.db import migrations

def createRol(apps, schema_editor):
    try:
        Rol = apps.get_model('users','Rol')
        Rol.objects.create(description='administrador')
        Rol.objects.create(description='usuario')
    except Exception as e:
        print('error', e)

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(createRol),
    ]
