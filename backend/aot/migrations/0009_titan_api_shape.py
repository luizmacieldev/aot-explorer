from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0008_alter_organization_img_debut"),
    ]

    operations = [
        migrations.AddField(
            model_name="titan",
            name="allegiance",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="titan",
            name="api_id",
            field=models.PositiveIntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="titan",
            name="current_inheritor",
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AddField(
            model_name="titan",
            name="former_inheritors",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AlterField(
            model_name="titan",
            name="height",
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AlterField(
            model_name="titan",
            name="img",
            field=models.CharField(blank=True, max_length=2048),
        ),
    ]
