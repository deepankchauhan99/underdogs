import json
import logging
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import FAQ, SKU, SKUVariant, SKUImage, SKUTag, SKUColor, SKUSize, SKUReview, Inventory, User
from .json_encoder import DecimalEncoder
from .helper import listItem
# from .forms import ContactForm
from django import forms
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout


logger = logging.getLogger('yourapp')

colors = SKUColor.objects.all()
sizes = SKUSize.objects.all()
COLOR_DICT = {sku_color.id: sku_color.name for sku_color in colors}
SIZE_DICT = {sku_size.id: sku_size.name for sku_size in sizes}

class RegistrationForm(forms.Form):
    firstname = forms.CharField(label="First Name")
    lastname = forms.CharField(label="Last Name")
    email = forms.EmailField(label="Email")
    password = forms.CharField(label="Password")
    repeat = forms.CharField(label="Repeat Password")

class LoginForm(forms.Form):
    email = forms.EmailField(label="Email")
    password = forms.CharField(label="Password")

# Routes
def index(request):
    return render(request, "store/index.html")

def register_auth(request):
    return render(request, 'store/register-final.html')

def collection(request):
    return render(request, "store/collection.html")


def item_description(request):
    return render(request, "store/item_description.html")

def user_profile(request):
    return render(request, "store/user_profile.html")

# def contact_us(request):
#     # if request.method=="POST":
#     #     form = ContactUs(request.POST)
#     #     if form.is_valid():
#     #         ContactUs.objects.create(
#     #             FirstName = form.cleaned_data['FirstName'],
#     #             LastName = form.cleaned_data['LastName'],
#     #             Query = form.cleaned_data['Query'],
#     #             email = form.cleaned_data['email']
#     #         )
#     #         return redirect('Success_Page')
#     # else:
#         # form = ContactForm()
#     return render(request, 'store/contact_us.html')








def contact_us(request):
    return render(request, "store/contact_us.html")




def register(request):
    form = RegistrationForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            firstname = form.cleaned_data['firstname']
            lastname = form.cleaned_data['lastname']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            repeat = form.cleaned_data['repeat']
            
            print(firstname)
            print(lastname)
            print(email)
            print(password)
            print(repeat)
            
            
            # print(User.objects.all())

            # print(User.objects.get(email=email))

            if password == repeat:
                user = User(first_name=firstname,last_name=lastname,email=email,password=password,is_staff=True)
                user.save()
                return HttpResponseRedirect(reverse("store:login"))
            else:
                error = "Password didn't match"
                print(error)
                return render(request, "store/register.html", {'form': form, 'error': error})
                # password didn't match

            # user = authenticate(request, username=username, password=password)
            # print(user)
            # if user is not None:
            #     django_login(request, user)
            #     logger.info(f'User:{user} logged in!')
            #     return redirect('shop')
            # else:
            #     logger.warning('Invalid username or password')
            #     form.add_error(None, 'Invalid username or password')
            
        else:
            print("Form errors:", form.errors)
            return render(request, "store/register.html", {'form': form})
    else:
        return render(request, "store/register.html", {'form': form})
    

def login(request):
    form = LoginForm(request.POST)
    if request.method == "POST":
        # Accessing username and password from form data
        email = request.POST["email"]
        password = request.POST["password"]
        print(email,password)
        # Check if username and password are correct, returning User object if so
        # user = authenticate(request, email=email, password=password)
        user = User.objects.get(email=email)
        print(user)
        db_pass = user.password
        print(db_pass)
        # If user object is returned, log in and route to index page:
        if db_pass == password:
            print('Auth success!')
            # login(request, user)
            # return HttpResponseRedirect(reverse("index"))
            return HttpResponseRedirect(reverse("store:index"))
        # Otherwise, return login page again with new context
        else:
            print("Invalid Password")
            return render(request, "store/login.html", {
                "message": "Invalid Credentials",
                "form": form
            })
    return render(request, "store/login.html", {'form': form})

def item(request, sku):
    item = SKU.objects.get(sku_id=sku)
    itemVariant = SKUVariant.objects.filter(sku_id=item.id)
    print(item)
    print(item.price)

  
    colorid = set()
    sizeid = set()

    for entity in itemVariant:
        colorid.add(entity.color_id)
        sizeid.add(entity.size_id)
    
    colors = [COLOR_DICT[color] for color in colorid]
    sizes = [SIZE_DICT[size] for size in sizeid]
   

    return render(request, "store/item-description.html", {"item": item, "colors": colors, "sizes": sizes})
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

