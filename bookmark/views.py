from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse


@login_required
def bookmark_application(request):
    current_user = request.user
    if request.method == 'POST':
        print("post request: favourite_application called")
        print(current_user.id)
    return HttpResponse('Hello world')
