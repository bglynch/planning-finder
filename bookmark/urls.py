from django.urls import path
import bookmark.views as view

urlpatterns = [
    path('bookmark/', view.bookmark_application, name='bookmark'),
    path('bookmark/remove/', view.remove_bookmark, name='remove_bookmark'),
]
