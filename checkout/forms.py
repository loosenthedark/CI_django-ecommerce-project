from django import forms
from .models import Order


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = (
            "full_name",
            "email",
            "phone_number",
            "street_address_1",
            "street_address_2",
            "town_or_city",
            "postcode",
            "county",
            "country",
        )

    def __init__(self, *args, **kwargs):
        """
        Add placeholders & classes, remove auto-generated labels & set autofocus on first form field
        """
        super().__init__(*args, **kwargs)
        placeholders = {
            "full_name": "Full Name",
            "email": "Email Address",
            "phone_number": "Phone Number",
            "county": "County",
            "postcode": "Postal Code",
            "town_or_city": "Town or City",
            "street_address_1": "Street Address 1",
            "street_address_1": "Street Address 2",
            "country": "Country",
        }

        self.fields["full_name"].widget.attrs["autofocus"] = True
        for field in self.fields:
            if self.fields[field].required:
                placeholder = f"{placeholders[field]} *"
            else:
                placeholder = {placeholders[field]}
            self.fields[field].widget.attrs["placeholder"] = placeholder
            self.fields[field].widget.attrs["class"] = "stripe-style-input"
            self.fields[field].label = False
