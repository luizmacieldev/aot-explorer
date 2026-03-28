from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0003_remove_organization_api_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="organization",
            name="api_id",
            field=models.PositiveIntegerField(blank=True, null=True, unique=True),
        ),
    ]
