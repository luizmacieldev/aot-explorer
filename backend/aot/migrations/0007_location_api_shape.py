from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0006_episode_api_shape"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="location",
            name="description",
        ),
        migrations.AddField(
            model_name="location",
            name="api_id",
            field=models.PositiveIntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="location",
            name="debut",
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AddField(
            model_name="location",
            name="img",
            field=models.CharField(blank=True, max_length=2048),
        ),
        migrations.AddField(
            model_name="location",
            name="notable_former_inhabitants",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="location",
            name="notable_inhabitants",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="location",
            name="region",
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AddField(
            model_name="location",
            name="territory",
            field=models.CharField(blank=True, max_length=512),
        ),
    ]
