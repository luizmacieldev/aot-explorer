from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0004_organization_api_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="character",
            name="age",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="character",
            name="alias",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="character",
            name="api_id",
            field=models.PositiveIntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="character",
            name="birthplace",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="character",
            name="episodes",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="character",
            name="gender",
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name="character",
            name="groups",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="character",
            name="height",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="character",
            name="occupation",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="character",
            name="relatives",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="character",
            name="residence",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="character",
            name="roles",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="character",
            name="species",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="character",
            name="status",
            field=models.CharField(blank=True, max_length=128),
        ),
    ]
