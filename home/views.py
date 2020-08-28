from django.shortcuts import render, redirect
from decouple import config
import requests
import json


# Create your views here.
def get_home(request):
    user = request.user
    print("user:", user)
    print("user_id:", user.id)
    print("auth:", user.is_authenticated)
    print("is_active():", user.is_active)

    if user.is_authenticated and user.profile.location:
        # if user is logged in and location is chosen
        if user.profile.has_set_location:
            print("user is good")
            latitude = user.profile.location.y
            longitude = user.profile.location.x
        # if user is logged in but location not chosen
        else:
            print("user need to add location")
            return redirect('choose_location')
    else:
        print("user is anonymous")
        # if user is ananymous
        latitude = 53.31
        longitude = -6.25

    current_settings = config('DJANGO_SETTINGS_MODULE')
    home_point = f'{str(longitude)}, {str(latitude)}'
    api_url = 'https://services.arcgis.com/NzlPQPKn5QF9v2US/arcgis/rest/services/' \
                'IrishPlanningApplications/FeatureServer/0/query'
    api_out_fields = '''
        ApplicationNumber,
        ApplicationStatus,
        Decision,
        DevelopmentDescription,
        LinkAppDetails,
        PlanningAuthority,
        ReceivedDate
        '''
    payload = {
        'f': 'geojson',
        'where': '1 = 1',
        'outSr': '4326',
        'geometryType': 'esriGeometryPoint',
        'outFields': api_out_fields,
        'inSr': '4326',
        'geometry': home_point,
        'distance': 2000,
        'orderByFields': 'ReceivedDate DESC',
    }
    planning_app_data = requests.get(api_url, params=payload).json()

    # Load Data from Public API
    # if current_settings == "planning_finder.settings.prod":
    #     home_point = f'{str(longitude)}, {str(latitude)}'
    #     api_url = 'https://services.arcgis.com/NzlPQPKn5QF9v2US/arcgis/rest/services/' \
    #               'IrishPlanningApplications/FeatureServer/0/query'
    #     api_out_fields = '''
    #         ApplicationNumber,
    #         ApplicationStatus,
    #         Decision,
    #         DevelopmentDescription,
    #         LinkAppDetails,
    #         PlanningAuthority,
    #         ReceivedDate
    #         '''
    #     payload = {
    #         'f': 'geojson',
    #         'where': '1 = 1',
    #         'outSr': '4326',
    #         'geometryType': 'esriGeometryPoint',
    #         'outFields': api_out_fields,
    #         'inSr': '4326',
    #         'geometry': home_point,
    #         'distance': 1000,
    #         'orderByFields': 'ReceivedDate DESC',
    #     }
    #     planning_app_data = requests.get(api_url, params=payload).json()
    # else:
    #     planning_app_data_path = config('PLANNING_APP_DATA')
    #     with open(planning_app_data_path) as f:
    #         planning_app_data = json.load(f)

    return render(request, 'home/home.html',
                  {'data': json.dumps(planning_app_data), 'is_home': True})
