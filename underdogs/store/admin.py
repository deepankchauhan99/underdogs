from django.contrib import admin
from .models import FAQ, User, SKU, SKUReview, SKUImage, SKUTag, SKUVariant, Inventory

# Register your models here.
admin.site.register(FAQ)
admin.site.register(User)
admin.site.register(SKU)
admin.site.register(SKUReview)
admin.site.register(SKUTag)
admin.site.register(SKUVariant)
admin.site.register(Inventory)
admin.site.register(SKUImage)