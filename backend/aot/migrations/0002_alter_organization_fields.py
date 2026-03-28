# Generated manually for Organization API shape

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="organization",
            name="description",
        ),
        migrations.AddField(
            model_name="organization",
            name="affiliation",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="organization",
            name="api_id",
            field=models.PositiveIntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="organization",
            name="debut",
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name="organization",
            name="img",
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name="organization",
            name="notable_former_members",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="organization",
            name="notable_members",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="organization",
            name="occupations",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
