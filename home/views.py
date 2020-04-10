from django.shortcuts import render
import requests
import json


# Create your views here.
def get_home(request):
    user = request.user
    print("user:", user)
    print("user_id:", user.id)
    print("username:", user.username)
    print("auth:", user.is_authenticated)
    print("is_active():", user.is_active)

    latitude = 53.31
    longitude = -6.25

    if user.is_authenticated and user.profile.location:
        latitude = user.profile.location.y
        longitude = user.profile.location.x

    home_point = f'{str(longitude)}, {str(latitude)}'

    payload = {
        'f': 'geojson',
        'where': '1 = 1',
        'outSr': '4326',
        'geometryType': 'esriGeometryPoint',
        'outFields': '*',
        'inSr': '4326',
        'geometry': home_point,
        'distance': 1000,
        'orderByFields': 'ReceivedDate DESC',
    }
    response = requests.get(
        'https://services.arcgis.com/NzlPQPKn5QF9v2US/arcgis/rest/services/IrishPlanningApplications/FeatureServer/0/query',
        params=payload)

    return render(request, 'home/home.html', {'data': json.dumps(response.json())})
