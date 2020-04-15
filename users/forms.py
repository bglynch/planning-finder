from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from leaflet.forms.widgets import LeafletWidget
from leaflet.forms.fields import PointField
from .models import Profile


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email']


class ProfileUpdateForm(forms.ModelForm):
    location = PointField()

    class Meta:
        model = Profile
        fields = ['location']
        widgets = {'location': LeafletWidget()}
