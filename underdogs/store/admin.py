from django.contrib import admin
from .models import FAQ, User, SKU, SKUReview, SKUImage, SKUTag, SKUVariant, Order, OrderItem, Inventory, Wishlist, Cart, CartItem

# Register your models here.
admin.site.register(FAQ)
admin.site.register(User)
admin.site.register(SKU)
admin.site.register(SKUReview)
admin.site.register(SKUTag)
admin.site.register(SKUVariant)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Inventory)
admin.site.register(SKUImage)
admin.site.register(Wishlist)
admin.site.register(Cart)
admin.site.register(CartItem)