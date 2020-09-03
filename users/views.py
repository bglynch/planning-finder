from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
import geopandas as gpd
from shapely.geometry import Point, Polygon
import requests
import json
import os
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
    # setting location
    if request.method == 'POST':
        profile_form = ProfileUpdateForm(request.POST, instance=request.user.profile)
        if profile_form.is_valid():
            point = profile_form.cleaned_data.get('location')
            if not point_in_allowed_council(point):
                messages.warning(request, f'Location not available, please choose location inside available boundaries')
                return redirect('choose_location')

            # setting location for a new user
            if not request.user.profile.has_set_location:
                profile_form.save()
                request.user.profile.has_set_location = True
                request.user.save()
                return redirect('home')
            # setting location for a new user
            else:
                messages.success(request, f'New location has been set')
                profile_form.save()
                return redirect('home')
    # choosing location
    else:
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

    api_out_fields = '''
    ApplicationNumber,
    ApplicationStatus,
    Decision,
    DevelopmentDescription,
    LinkAppDetails,
    PlanningAuthority,
    ReceivedDate
    '''

    api_url = 'https://services.arcgis.com/NzlPQPKn5QF9v2US/arcgis/rest/services/' \
                'IrishPlanningApplications/FeatureServer/0/query'

    app_numbers = [x.planning_id for x in request.user.favourite_set.all()]
    query_string = ""
    for app in app_numbers[:-1]:
        query_string += f"ApplicationNumber = '{app}' OR "
    query_string += f"ApplicationNumber = '{app_numbers[-1]}'"

    payload = {
        'f': 'geojson',
        'where': query_string,
        'outSr': '4326',
        'geometryType': 'esriGeometryPoint',
        'outFields': api_out_fields,
        'inSr': '4326',
        'orderByFields': 'ReceivedDate DESC',
    }
    planning_app_data = requests.get(api_url, params=payload).json()

    return render(request, 'users/profile.html', {'data': json.dumps(planning_app_data),'user_form': user_form, 'profile_form': profile_form})


def point_in_allowed_council(point):
    file = f"{os.getcwd()}/static/data/councils-dublin.geojson"
    df = gpd.read_file(file)
    df = df[df.ENGLISH != 'other']
    result = False
    p1 = Point(point.x, point.y)

    for index, row in df.iterrows():
        poly = row['geometry']
        if p1.within(poly):
            result = True
            break

    return result
