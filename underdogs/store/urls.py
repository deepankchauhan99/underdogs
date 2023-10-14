from django.urls import path
from . import views

app_name = "store"
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("register", views.register, name="register"),
    path ("item/<str:sku>/", views.item, name='item'),
    path ("contact-us", views.contact_us, name='contact-us'),
    # path ("collection", views.collection, name='collection'),
    path ("item_description", views.item_description, name='collection'),
    # path("shop", views.shop, name="shop"),
    # path("about", views.about, name="about"),
    # path("contact", views.contact, name="contact"),
    # path("faq", views.faq, name="faq"),
    # path("returns", views.returns, name="returns"),
    # path("policy", views.policy, name="policy"),
    # path("sku/<str:sku_id>", views.item_description, name="item_description"),
]
