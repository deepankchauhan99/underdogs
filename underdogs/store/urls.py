from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("shop", views.shop, name="shop"),
    path("women", views.women, name="women"),
    path("men", views.men, name="men"),
    path("sale", views.sale, name="sale"),
    path("about", views.about, name="about"),
    path("contact", views.contact, name="contact"),
    path("faq", views.faq, name="faq"),
    path("returns", views.returns, name="returns"),
    path("policy", views.policy, name="policy"),
    path("search", views.search, name="search"),
]
