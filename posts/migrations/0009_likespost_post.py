# Generated by Django 3.2.3 on 2021-08-07 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0008_comments_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='likespost',
            name='post',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='post_likesPost', to='posts.post'),
        ),
    ]
