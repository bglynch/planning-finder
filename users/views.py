from django.db import transaction
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileRegisterForm


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
            return redirect('register_profile')
    else:
        user_form = UserRegisterForm()
    return render(request, 'users/register.html', {'user_form': user_form})


@login_required
def register_profile(request):
    if request.method == 'POST':
        profile_form = ProfileRegisterForm(request.POST, instance=request.user.profile)
        if profile_form.is_valid():
            profile_form.save()
            return redirect('home')
    else:
        profile_form = ProfileRegisterForm(instance=request.user.profile)
    return render(request, 'users/register_profile.html', {'profile_form': profile_form})


@login_required
def profile(request):
    return render(request, 'users/profile.html')
