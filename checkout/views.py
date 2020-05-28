from django.shortcuts import render

# Create your views here.
from django.shortcuts import render


def checkout(request):
    return render(request, 'checkout/checkout.html')
