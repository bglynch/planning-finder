from django.test import TestCase
from django.apps import apps

from users.apps import UsersConfig
from users.models import CustomUser
from .forms import UserRegisterForm


# Create your tests here.


class TestAccountsForms(TestCase):

    # ---------------------------------------------------Happy Path Tests
    def test_register(self):
        form = UserRegisterForm({
            'email': 'benji@ex.com',
            'password1': 'h3!!oPass',
            'password2': 'h3!!oPass',
        })
        self.assertTrue(form.is_valid())

    # ---------------------------------------------------Sad Path Tests
    def test_register_poor_password(self):
        form = UserRegisterForm({
            'email': 'benji@ex.com',
            'password1': 'password',
            'password2': 'password',
        })
        self.assertFalse(form.is_valid())
        self.assertEqual(
            form.errors['password2'], ["This password is too common."]
        )

    def test_register_different_passwords(self):
        form = UserRegisterForm({
            'email': 'benji@ex.com',
            'password1': 'h3!!oPass',
            'password2': 'h3!!oPas',
        })
        self.assertFalse(form.is_valid())
        self.assertEqual(
            form.errors['password2'], ["The two password fields didn't match."]
        )

    def test_register_bad_email(self):
        form = UserRegisterForm({
            'email': 'benjiex.com',
            'password1': 'h3!!oPass',
            'password2': 'h3!!oPas',
        })
        self.assertFalse(form.is_valid())
        self.assertEqual(
            form.errors['email'], ["Enter a valid email address."]
        )


class TestAccountsViews(TestCase):
    """Testing the views.py file"""

    # ------------------------------------------def register(request)
    def test_get_register_page(self):
        # Create and login a user

        page = self.client.get("/register/")

        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "users/register.html")

    def test_register_new_user(self):
        response = self.client.post("/register/", {
            'email': 'benji@ex.com',
            'password1': 'h3!!oPass',
            'password2': 'h3!!oPass'
        })

        self.assertRedirects(response, '/register-profile/', status_code=302, target_status_code=200, fetch_redirect_response=True)

    # ------------------------------------------def profile(request):
    def test_get_profile_page(self):
        # Create and login a user
        CustomUser.objects.create_user(email="benji@ex.com", password="h3!!oPass")
        self.client.login(email="benji@ex.com", password='h3!!oPass')

        page = self.client.get("/profile/")
        html = page.content.decode('utf8')

        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "users/profile.html")
        self.assertIn('benji', html)


class TestAccountsApps(TestCase):
    """Testing the apps.py file"""

    def test_apps(self):
        self.assertEqual(UsersConfig.name, 'users')
        self.assertEqual(apps.get_app_config('users').name, 'users')
