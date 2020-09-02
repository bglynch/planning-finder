from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse


@login_required
def bookmark_application(request):
    if request.method == 'POST':
        current_user = request.user
        data = request.POST.get('data')
        print(f"Bookmarking application {data}, for {current_user.id}")
        return HttpResponse(status=200)

@login_required
def remove_bookmark(request):
    if request.method == 'POST':
        current_user = request.user
        data = request.POST.get('data')
        print(f"Removing bookmark application {data}, for {current_user.id}")
        return HttpResponse(status=200)
