# Generated by Django 5.1.1 on 2024-12-26 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intrauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='intrauser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
