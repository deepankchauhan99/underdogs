import json
import logging
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as django_login
from .models import FAQ, SKU, SKUVariant, SKUImage, SKUTag, SKUReview, Inventory
from .json_encoder import DecimalEncoder
from .helper import listItem
from .forms import LoginForm

logger = logging.getLogger('yourapp')

# Routes
def index(request):
   
    return render(request, "store/home.html")

# def register(request):
#     if request.method == 'POST':
#         pass
#     else:
#         return render(request, "store/register.html")

# def login(request):
#     if request.method == 'POST':
#         form = LoginForm(request.POST)
#         if form.is_valid():
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             # print(username, password)
#             user = authenticate(request, username=username, password=password)
#             # print(user)
#             if user is not None:
#                 django_login(request, user)
#                 logger.info(f'User:{user} logged in!')
#                 return redirect('shop')
#             else:
#                 logger.warning('Invalid username or password')
#                 form.add_error(None, 'Invalid username or password')
#     else:
#         form = LoginForm()
#     return render(request, "store/login.html", {'form': form})

# def shop(request):
#     sku_dict = listItem()
#     return render(request, "store/shop.html", {
#         'sku_dict': json.dumps(sku_dict, cls=DecimalEncoder)
#     })

# def item_description(request, sku_id):
#     print(sku_id)
#     sku_data = SKU.objects.get(name=sku_id)
#     print('sku_data:')
#     print(sku_data.price)
#     return render(request, "store/item_description.html", {"sku_data": sku_data})


# def user(request, username):

#     return render(request, )




# def faq(request):
#     faqs = FAQ.objects.all()
#     faqs_dict_section1 = {}
#     faqs_dict_section2 = {}
    
#     print(faqs)
#     for faq in faqs:
#         if faq.section == 'General':
#             faqs_dict_section1[faq.question] = faq.answer
#         elif faq.section == 'Setting up FAQs':
#             faqs_dict_section2[faq.question] = faq.answer
    
#     print(faqs_dict_section1)
#     print(faqs_dict_section2)
#     return render(request, "store/faq.html", {
#         'faqs_section1': faqs_dict_section1,
#         'faqs_section2': faqs_dict_section2
#     })

# def about(request):
#     return render(request, "store/layout.html")

# def contact(request):
#     return render(request, "store/contact.html")

# def returns(request):
#     return render(request, "store/returns.html")

# def policy(request):
#     return render(request, "store/policy.html")




def user(request, name):
    print(name)
    return name