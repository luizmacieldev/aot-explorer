from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0005_character_api_shape"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="episode",
            name="characters",
        ),
        migrations.RemoveField(
            model_name="episode",
            name="description",
        ),
        migrations.AddField(
            model_name="episode",
            name="api_id",
            field=models.PositiveIntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="episode",
            name="episode_code",
            field=models.CharField(blank=True, max_length=32),
        ),
        migrations.AddField(
            model_name="episode",
            name="img",
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name="episode",
            name="characters",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AlterField(
            model_name="episode",
            name="name",
            field=models.CharField(max_length=512),
        ),
    ]
