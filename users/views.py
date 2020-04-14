from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileForm


# Create your views here.

def register(request):
    if request.method == 'POST':
        user_form = UserRegisterForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            new_user = authenticate(
                username=user_form.cleaned_data['username'],
                password=user_form.cleaned_data['password1'],
            )
            login(request, new_user)
            return redirect('home')
    else:
        user_form = UserRegisterForm()
    return render(request, 'users/register.html', {'user_form': user_form})


@login_required
def profile(request):
    return render(request, 'users/profile.html')
