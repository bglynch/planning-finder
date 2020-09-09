from django.urls import path
import checkout.views as view

urlpatterns = [
    path('payments/', view.HomePageView.as_view(), name="checkhome"),
    path('config/', view.stripe_config),
    path('payments/create-checkout-session/', view.create_checkout_session),
    path('payments/cancelled/', view.payment_cancelled),
    path('payments/success/', view.payment_success),
]