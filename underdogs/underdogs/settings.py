"""
Django settings for underdogs project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-tx5&d98e+-#s3==so*s@w$&^sr0b(y6^=+j4r^bsio8+c3d4@k'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'store',
    'fontawesomefree',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'underdogs.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
            ],
        },
    },
]

WSGI_APPLICATION = 'underdogs.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

AUTHENTICATION_BACKENDS = ['store.backends.EmailOrPhoneBackend']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'underdogs_server',
        'USER': 'underdogs',
        'PASSWORD': 'underdogs',
        'HOST': 'localhost',  # Use 'localhost' if running locally
        'PORT': '5432',  # Default port is 5432 for PostgreSQL
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# add media directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


# Logging configuration
# settings.py
import os
import logging
from logging.handlers import RotatingFileHandler
from django.utils.timezone import localtime

# Define the logs folder path
LOGS_FOLDER = os.path.join(BASE_DIR, 'logs')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{asctime} {levelname} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'custom_verbose': {
            'format': '{asctime} {levelname} {module} <process:{process:d}> <thread:{thread:d}> {message}',
            'style': '{',
            'datefmt': '%Y-%m-%d %H:%M:%S %Z',  # Add the date format with timezone (%Z)
        },
    },
    'handlers': {
        'debug_file': {
            'class': 'logging.handlers.RotatingFileHandler',  # Use RotatingFileHandler for rotating log files
            'filename': os.path.join(LOGS_FOLDER, 'debug.log'),  # Debug log file path
            'formatter': 'custom_verbose',  # Include timestamps with timezone using the 'custom_verbose' formatter
            'maxBytes': 100 * 1024 * 1024,  # Maximum log file size (100MB)
            'backupCount': 5,  # Number of backup log files to keep
            'level': 'DEBUG',  # Log level for debug logs and above (all messages)
        },
        'error_file': {
            'class': 'logging.handlers.RotatingFileHandler',  # Use RotatingFileHandler for rotating log files
            'filename': os.path.join(LOGS_FOLDER, 'error.log'),  # Error log file path
            'formatter': 'custom_verbose',  # Include timestamps with timezone using the 'custom_verbose' formatter
            'maxBytes': 100 * 1024 * 1024,  # Maximum log file size (100MB)
            'backupCount': 5,  # Number of backup log files to keep
            'level': 'ERROR',  # Log level for error logs and above
        },
        'django_file': {
            'class': 'logging.handlers.RotatingFileHandler',  # Use RotatingFileHandler for rotating log files
            'filename': os.path.join(LOGS_FOLDER, 'django.log'),  # Django log file path for internal logs
            'formatter': 'verbose',  # Include timestamps using the 'verbose' formatter
            'maxBytes': 100 * 1024 * 1024,  # Maximum log file size (100MB)
            'backupCount': 5,  # Number of backup log files to keep
            'level': 'INFO',  # Log level for Django's internal logs (INFO and above)
        },
    },
    'loggers': {
        'django': {
            'handlers': ['django_file'],  # Output Django's internal logs to 'django.log' file
            'level': 'INFO',  # Log level for Django's internal logs (INFO and above)
            'propagate': False,
        },
        'django.server': {
            'handlers': ['django_file'],  # Output Django's internal server logs to 'django.log' file
            'level': 'INFO',  # Log level for Django's internal server logs (INFO and above)
            'propagate': False,
        },
        'django.request': {
            'handlers': ['error_file'],
            'level': 'ERROR',  # Set the log level for errors (500 responses) and above
            'propagate': False,
        },
        'store': {  # Replace 'store' with the name of your Django app
            'handlers': ['debug_file'],
            'level': 'DEBUG',  # Set the log level for your app's debug messages
            'propagate': False,
        },
    },
    'root': {
        'handlers': ['debug_file'],
        'level': 'DEBUG',  # Set the root logger level to the lowest log level among handlers (DEBUG in this case)
    },
}
