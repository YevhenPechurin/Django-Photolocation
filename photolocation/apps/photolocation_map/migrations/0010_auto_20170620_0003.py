# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-19 21:03
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photolocation_map', '0009_auto_20170619_2237'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='uploadfile',
            name='title',
        ),
        migrations.RemoveField(
            model_name='uploadfile',
            name='user',
        ),
    ]
