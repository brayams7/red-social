# Generated by Django 3.2.3 on 2021-08-03 06:43

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0005_alter_post_tagfriends'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='tagFriends',
            field=models.ManyToManyField(through='posts.TagFriends', to=settings.AUTH_USER_MODEL),
        ),
    ]