from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


# Helping functions
def user_directory_path(instance, filename):
    # Upload the image to a directory specific to the user
    return f'user_images/user_{instance.email}/{filename}'

def sku_directory_path(instance, filename):
    # Upload the image to a directory specific to the sku
    return f'sku_images/sku_{instance.sku}/{instance.name}.jpg'

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    first_name = models.CharField(max_length=100, default=None)
    last_name = models.CharField(max_length=100, default=None)
    email = models.EmailField(unique=True, default=None)
    password = models.CharField(max_length=128, default=None)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(default=None, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    profile_picture = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'address', 'date_of_birth', 'gender']

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
    
class FAQ(models.Model):

    SECTION_CHOICES = [
        ('General', 'General'),
        ('Setting up FAQs', 'Setting up FAQs'),
    ]

    question = models.CharField(max_length=255)
    answer = models.TextField()
    section = models.CharField(max_length=15, choices=SECTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class SKU(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField('SKUTag')
    quantity = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.name
    
class SKUImage(models.Model):
    sku = models.ForeignKey('SKU', on_delete=models.CASCADE, related_name='images')
    name = models.CharField(max_length=100)
    sku_image = models.ImageField(upload_to=sku_directory_path, default="sku_images/default/blank-image.jpg")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.name} for SKU: {self.sku.name}"
            
class SKUVariant(models.Model):

    # Define the choices for color and size
    COLOR_CHOICES = [
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('green', 'Green'),
        # Add more color choices as needed
    ]

    SIZE_CHOICES = [
        ('s', 'Small'),
        ('m', 'Medium'),
        ('l', 'Large'),
        # Add more size choices as needed
    ]
    sku = models.ForeignKey(SKU, on_delete=models.CASCADE, related_name="skuvariant")
    color = models.CharField(max_length=20, choices=COLOR_CHOICES)
    size = models.CharField(max_length=20, choices=SIZE_CHOICES)

    def __str__(self):
        return f"{self.sku.name} - {self.color} - {self.size}"
    
    class Meta:
        unique_together = ('sku', 'color', 'size')

class SKUTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class SKUReview(models.Model):
    sku = models.ForeignKey(SKU, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for SKU: {self.sku.name} - {self.user.first_name} {self.user.last_name}"

class Inventory(models.Model):
    sku_variant = models.OneToOneField(SKUVariant, on_delete=models.CASCADE, related_name='inventory')
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.sku_variant} - Quantity: {self.quantity}"
    
    class Meta:
        verbose_name_plural = "Inventories"

# To show updated inventory count for each SKU
@receiver(post_save, sender=Inventory)
@receiver(post_delete, sender=Inventory)
def update_sku_quantity(sender, instance, **kwargs):
    sku_variant = instance.sku_variant
    sku = sku_variant.sku
    sku.quantity = Inventory.objects.filter(sku_variant__sku=sku).aggregate(total_quantity=models.Sum('quantity'))['total_quantity'] or 0
    sku.save()