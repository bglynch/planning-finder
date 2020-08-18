from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.utils.html import format_html

from .forms import UserRegisterForm, ProfileUpdateForm, UserUpdateForm


# Create your views here.

def register(request):
    if request.method == 'POST':
        user_form = UserRegisterForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            new_user = authenticate(
                email=user_form.cleaned_data['email'],
                password=user_form.cleaned_data['password1'],
            )
            login(request, new_user)

            return redirect('choose_location')
    else:
        user_form = UserRegisterForm()
    return render(request, 'users/register.html', {'user_form': user_form})


@login_required
def choose_location(request):
    print("=================== choose_location called")
    print(request.user)
    print(request.user.profile.has_set_location)
    if request.method == 'POST':
        profile_form = ProfileUpdateForm(request.POST, instance=request.user.profile)
        if profile_form.is_valid():
            if not request.user.profile.has_set_location:
                profile_form.save()
                request.user.profile.has_set_location = True
                request.user.save()
                return redirect('home')
            else:
                profile_form.save()
                return redirect('profile')

    else:
        profile_form = ProfileUpdateForm(instance=request.user.profile)

    if not request.user.profile.has_set_location:
        messages.success(request, f'Account created for {request.user.email} !')
    return render(request, 'users/choose-location.html', {'profile_form': profile_form})


@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, f'{request.user.email}, your location has been updated')
            return redirect('home')
    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm(instance=request.user.profile)

    return render(request, 'users/profile.html', {'user_form': user_form, 'profile_form': profile_form})
