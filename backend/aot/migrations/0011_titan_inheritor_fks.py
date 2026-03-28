import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aot", "0010_remove_character_organization_remove_character_titan"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="titan",
            name="current_inheritor",
        ),
        migrations.RemoveField(
            model_name="titan",
            name="former_inheritors",
        ),
        migrations.AddField(
            model_name="titan",
            name="current_inheritor",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="titans_as_current_inheritor",
                to="aot.character",
            ),
        ),
        migrations.AddField(
            model_name="titan",
            name="former_inheritors",
            field=models.ManyToManyField(
                blank=True,
                related_name="titans_as_former_inheritor",
                to="aot.character",
            ),
        ),
    ]
