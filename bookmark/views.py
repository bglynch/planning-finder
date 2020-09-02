from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden
from bookmark.models import Favourite


@login_required
def bookmark_application(request):
    if request.method == 'POST':
        current_user = request.user
        data = request.POST.get('data')
        bookmark = Favourite()
        bookmark.planning_id = data
        bookmark.user = current_user

        bookmark.save()
        print(f"Bookmarking application {data}, for {current_user.id}")
        return HttpResponse(status=200)


@login_required
def remove_bookmark(request):
    if request.method == 'POST':
        current_user = request.user
        data = request.POST.get('data')
        bookmark = Favourite.objects.filter(user=current_user).filter(planning_id=data)
        bookmark.delete()
        print(f"Removing bookmark application {data}, for {current_user.id}")
        return HttpResponse(status=200)
