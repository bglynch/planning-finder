from django.shortcuts import redirect
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import stripe

from decouple import config

# Create your views here.
from django.views.generic.base import TemplateView


class HomePageView(TemplateView):
    template_name = 'home.html'


@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': config('STRIPE_PUBLISHABLE_KEY')}
        return JsonResponse(stripe_config, safe=False)


@csrf_exempt
def create_checkout_session(request):
    if request.method == 'GET':
        domain_url = request.headers['Referer']
        stripe.api_key = config('STRIPE_SECRET_KEY')
        try:
            # Create new Checkout Session for the order
            # Other optional params include:
            # [billing_address_collection] - to display billing address details on the page
            # [customer] - if you have an existing Stripe Customer ID
            # [payment_intent_data] - lets capture the payment later
            # [customer_email] - lets you prefill the email input in the form
            # For full details see https:#stripe.com/docs/api/checkout/sessions/create

            # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url + 'payments/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'payments/cancelled/',
                payment_method_types=['card'],
                mode='payment',
                line_items=[{
                    'price_data': {
                        'currency': 'eur',
                        'product_data': {'name': 'Coffee'},
                        'unit_amount': 350,
                    },
                    'quantity': 1,
                }]
            )
            return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({'error': str(e)})


def payment_cancelled(request):
    return redirect('home')


def payment_success(request):
    messages.success(request, f'Thanks for your support. You Rock!')
    return redirect('home')
