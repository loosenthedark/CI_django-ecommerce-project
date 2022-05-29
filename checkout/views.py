from django.shortcuts import render, redirect, reverse
from django.contrib import messages

from .forms import OrderForm

# Create your views here.
def checkout(request):
    bag = request.session.get("bag", {})
    if not bag:
        messages.error(request, "There's nothing in your bag at the moment!")

    order_form = OrderForm()
    template = "checkout/checkout.html"
    context = {
        "order_form": order_form,
        "stripe_public_key": "pk_test_51KK1E5KyJvXePp5nA3a9ufLkBmsZxKoSKERDUSWe1EUd2Whn2ind3QtTPkP8XRtm5UOwqqljWA52wyaUtZMDGTlv00MhD1DaeB",
        "client_secret": "test client secret",
    }

    return render(request, template, context)
