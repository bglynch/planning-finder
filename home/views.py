from django.shortcuts import render, redirect
import requests
import json


# Create your views here.
def get_home(request):
    user = request.user
    if user.is_authenticated and user.profile.location:
        # if user is logged in and location is chosen
        if user.profile.has_set_location:
            latitude = user.profile.location.y
            longitude = user.profile.location.x
            bookmarks = [x.planning_id for x in user.favourite_set.all()]
        # if user is logged in but location not chosen
        else:
            return redirect('choose_location')
    else:
        # if user is ananymous
        bookmarks = []
        latitude = 53.31
        longitude = -6.25

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
        'distance': 1000,
        'orderByFields': 'ReceivedDate DESC',
    }
    planning_app_data = requests.get(api_url, params=payload).json()

    return render(request, 'home/home.html',
                  {'data': json.dumps(planning_app_data), 'is_home': True, 'bookmarks': json.dumps(bookmarks)})
