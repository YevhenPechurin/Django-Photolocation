# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-18 19:45
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photolocation_map', '0003_delete_immage'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uploadfile',
            old_name='file',
            new_name='image',
        ),
    ]
