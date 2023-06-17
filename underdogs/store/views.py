from django.http import HttpResponse
from django.shortcuts import render

# Routes
def index(request):
    return render(request, "store/index.html")

def shop(request):
    return render(request, "store/shop.html")

def women(request):
    return render(request, "store/women.html")

def men(request):
    return render(request, "store/men.html")

def sale(request):
    return render(request, "store/sale.html")

def about(request):
    return render(request, "store/about.html")

def contact(request):
    return render(request, "store/contact.html")

def faq(request):
    return render(request, "store/faq.html")

def returns(request):
    return render(request, "store/returns.html")

def policy(request):
    return render(request, "store/policy.html")