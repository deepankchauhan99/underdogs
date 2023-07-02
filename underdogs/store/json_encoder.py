from decimal import Decimal
from django.core.serializers.json import DjangoJSONEncoder

class DecimalEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)  # Convert Decimal to float
        return super().default(obj)
