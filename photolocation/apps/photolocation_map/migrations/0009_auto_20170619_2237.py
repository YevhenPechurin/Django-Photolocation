# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-19 19:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photolocation_map', '0008_auto_20170619_1743'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uploadfile',
            old_name='name',
            new_name='title',
        ),
    ]