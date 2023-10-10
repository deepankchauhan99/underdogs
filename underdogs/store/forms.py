from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

class ContactForm(forms.Form):
    FirstName = forms.CharField(max_length=100)
    LastName = forms.CharField(max_length=100)
    Query = forms.CharField( max_length=300 )
    email = forms.EmailField()