from django.db import models

# Create your models here.
class BaseModel(models.Model):
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True) 

    class Meta:
        abstract = True
        verbose_name ="Model base"
    
    def delete(self):
        self.state = False
        self.save()
