from django.http import HttpResponse
from django.shortcuts import render
from .models import FAQ, SKU, SKUVariant, SKUImage, SKUTag, SKUReview, Inventory
import json
from .json_encoder import DecimalEncoder
from .helper import listItem

# Routes
def index(request):
    sku_dict = listItem()
    return render(request, "store/index.html", {
        'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder)
    })

def shop(request):
    sku_dict = listItem()
    return render(request, "store/shop.html", {
        'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder)
    })

def women(request):
    sku_dict = listItem()
    return render(request, "store/women.html", {
        'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder)
    })

def men(request):
    sku_dict = listItem()
    return render(request, "store/men.html", {
        'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder)
    })

def sale(request):
    sku_dict = listItem()
    return render(request, "store/sale.html", {
        'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder)
    })

def search(request):
    sku_dict = listItem()
    sku_tags = SKUTag.objects.all()
    return render(request, "store/search.html", {
        'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder),
        'sku_tags': sku_tags
    })

def faq(request):
    faqs = FAQ.objects.all()
    faqs_dict_section1 = {}
    faqs_dict_section2 = {}
    
    print(faqs)
    for faq in faqs:
        if faq.section == 'General':
            faqs_dict_section1[faq.question] = faq.answer
        elif faq.section == 'Setting up FAQs':
            faqs_dict_section2[faq.question] = faq.answer
    
    print(faqs_dict_section1)
    print(faqs_dict_section2)
    return render(request, "store/faq.html", {
        'faqs_section1': faqs_dict_section1,
        'faqs_section2': faqs_dict_section2
    })

def about(request):
    return render(request, "store/about.html")

def contact(request):
    return render(request, "store/contact.html")

def returns(request):
    return render(request, "store/returns.html")

def policy(request):
    return render(request, "store/policy.html")