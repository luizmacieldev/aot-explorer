from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0007_location_api_shape"),
    ]

    operations = [
        migrations.AlterField(
            model_name="organization",
            name="debut",
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AlterField(
            model_name="organization",
            name="img",
            field=models.CharField(blank=True, max_length=2048),
        ),
    ]
