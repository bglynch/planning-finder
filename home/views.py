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

    response2 = requests.get(
        # 'https://services.arcgis.com/NzlPQPKn5QF9v2US/ArcGIS/rest/services/Local_Authority_Boundaries/FeatureServer/0/query?where=1%3D1&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&resultType=none&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&returnExceededLimitFeatures=true&f=geojson')
        'https://services6.arcgis.com/uWTLlTypaM5QTKd2/ArcGIS/rest/services/Administrative_Areas_OSi_National_Statutory_Boundaries_Generalised_20M/FeatureServer/0/query?where=1=1&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=ENGLISH&returnGeometry=true&featureEncoding=esriDefault&returnExceededLimitFeatures=true&f=geojson')

    return render(request, 'home/home.html',
                  {'data': json.dumps(response.json()), 'council': json.dumps(response2.json()), 'is_home': True})
