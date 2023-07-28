# backends.py

from django.contrib.auth.backends import BaseBackend
from .models import User

class EmailOrPhoneBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(phone_number=username)
            except User.DoesNotExist:
                print("User doesn't exist")
                return None
        print(user)
        print(user.check_password(password))
        if user.check_password(password):
            print("didn't match")
            return user
        try:
            if User.objects.get(password=password):
                print('user has unprotected password')
                return user
        except User.DoesNotExist:
            return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
