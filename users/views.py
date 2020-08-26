from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from .forms import UserRegisterForm, ProfileUpdateForm, UserUpdateForm


# register new user
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


# set location of new/existing user
@login_required
def choose_location(request):
    print("=================== choose_location called")
    print(request.user)
    print(request.user.profile.has_set_location)
    # setting location
    if request.method == 'POST':
        print(f"choose_location:POST")
        profile_form = ProfileUpdateForm(request.POST, instance=request.user.profile)
        if profile_form.is_valid():
            if not request.user.profile.has_set_location:
                profile_form.save()
                request.user.profile.has_set_location = True
                request.user.save()
                return redirect('home')
            else:
                messages.success(request, f'New location has been set')
                profile_form.save()
                return redirect('home')
    # choosing location
    else:
        print(f"choose_location:GET")
        profile_form = ProfileUpdateForm(instance=request.user.profile)

    # new user who has not yet set location
    if not request.user.profile.has_set_location:
        messages.success(request, f'Account created for {request.user.email} !')
    return render(request, 'users/choose-location.html', {'profile_form': profile_form})

# get user profile
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
