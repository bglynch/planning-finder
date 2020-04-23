from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from leaflet.forms.widgets import LeafletWidget
from leaflet.forms.fields import PointField
from .models import Profile, CustomUser


class UserRegisterForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email',)


class UserUpdateForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ['email']


class ProfileUpdateForm(forms.ModelForm):
    location = PointField()

    class Meta:
        model = Profile
        fields = ['location']
        widgets = {'location': LeafletWidget()}
