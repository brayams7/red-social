# Generated by Django 3.2.3 on 2021-07-22 23:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0007_auto_20210716_2018'),
        ('posts', '0003_auto_20210719_1943'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='blockComments',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_post', to='users.profile'),
        ),
        migrations.AlterField(
            model_name='post',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_post', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='TagFriends',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.BooleanField(default=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_tagFriends', to='posts.post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_tagFriends', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Model base',
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='post',
            name='tagFriends',
            field=models.ManyToManyField(through='posts.TagFriends', to=settings.AUTH_USER_MODEL),
        ),
    ]
