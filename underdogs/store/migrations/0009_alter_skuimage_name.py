# Generated by Django 4.2.2 on 2023-06-20 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_alter_skuimage_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skuimage',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
