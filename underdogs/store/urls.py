from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register/", views.register )
    # path("login", views.login, name="login"),
    # path("register", views.register, name="register"),
    # path ("user/<str:name>/", views.user, name='user'),
    # path("shop", views.shop, name="shop"),
    # path("about", views.about, name="about"),
    # path("contact", views.contact, name="contact"),
    # path("faq", views.faq, name="faq"),
    # path("returns", views.returns, name="returns"),
    # path("policy", views.policy, name="policy"),
    # path("sku/<str:sku_id>", views.item_description, name="item_description"),
]
