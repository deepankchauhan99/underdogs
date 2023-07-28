''' Helper functions '''
from .models import SKU, SKUVariant, SKUImage, SKUTag, SKUReview, Inventory
from django.db import connection

def listItem():
    sku_dict = {}

    # Retrieve SKU data from the models
    sku_data = SKU.objects.all().values('id', 'name', 'price', 'description', 'created_at', 'updated_at', 'quantity')
    sku_variant_data = SKUVariant.objects.all().values('sku__id', 'color', 'size')
    sku_review_data = SKUReview.objects.all().values('sku__id', 'user__first_name', 'user__last_name', 'rating', 'review_text')
    sku_image_data = SKUImage.objects.all().values('sku__id', 'sku_image')
    inventory_data = Inventory.objects.all().values('sku_variant__sku__id', 'sku_variant__color', 'sku_variant__size', 'quantity')

    # Group SKU data by SKU ID
    for sku in sku_data:
        sku_id = sku['id']
        sku_dict[sku_id] = {
            'name': sku['name'],
            'price': sku['price'],
            'description': sku['description'],
            'created_at': sku['created_at'],
            'updated_at': sku['updated_at'],
            'quantity': sku['quantity'],
            'variants': [],
            'tags': [],
            'reviews': [],
            'inventory': [],
            'images': []
        }

        # Add SKU variant data to the SKU dictionary
        for variant in sku_variant_data:
            if variant['sku__id'] == sku_id:
                sku_dict[sku_id]['variants'].append({
                    'color': variant['color'],
                    'size': variant['size']
                })

        # Add SKU review data to the SKU dictionary
        for review in sku_review_data:
            if review['sku__id'] == sku_id:
                sku_dict[sku_id]['reviews'].append({
                    'user_first_name': review['user__first_name'],
                    'user_last_name': review['user__last_name'],
                    'rating': review['rating'],
                    'review_text': review['review_text']
                })

        # Add inventory data to the SKU dictionary
        for inventory in inventory_data:
            if inventory['sku_variant__sku__id'] == sku_id:
                sku_dict[sku_id]['inventory'].append({
                    'color': inventory['sku_variant__color'],
                    'size': inventory['sku_variant__size'],
                    'quantity': inventory['quantity']
                })

        # Execute the raw SQL query to retrieve SKU tags data
        query = "SELECT name FROM store_skutag WHERE id IN (SELECT skutag_id FROM store_sku_tags WHERE sku_id IN (SELECT id FROM store_sku WHERE name = %s))"
        with connection.cursor() as cursor:
            cursor.execute(query, [sku['name']])
            sku_tags = cursor.fetchall()
            sku_dict[sku_id]['tags'] = [tag[0] for tag in sku_tags]

        # Add SKU image data to the SKU dictionary
        for image in sku_image_data:
            if image['sku__id'] == sku_id:
                sku_id = image['sku__id']
                sku_dict[sku_id]['images'].append(image['sku_image'])

    print(sku_dict)
    return sku_dict

