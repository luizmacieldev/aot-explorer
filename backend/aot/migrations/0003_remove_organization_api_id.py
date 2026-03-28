from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0002_alter_organization_fields"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="organization",
            name="api_id",
        ),
    ]
