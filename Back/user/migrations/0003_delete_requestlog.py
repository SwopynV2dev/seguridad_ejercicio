# Generated by Django 5.0.4 on 2024-05-07 21:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_requestlog'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RequestLog',
        ),
    ]
