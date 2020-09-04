from django.test import TestCase
from django.test.client import Client
from users.models import CustomUser


# Create your tests here.
class TestBookmarks(TestCase):
    def test_add_bookmark(self):
        client = Client()
        user = CustomUser.objects.create_user(email="benji@ex.com", password="h3!!oPass")
        client.login(email="benji@ex.com", password='h3!!oPass')
        client.post("/bookmark/", {"data": "12A273"}, **{'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'})
        self.assertEqual(["12A273"], [x.planning_id for x in user.favourite_set.all()])

    def test_remove_bookmark(self):
        client = Client()
        user = CustomUser.objects.create_user(email="benji@ex.com", password="h3!!oPass")
        client.login(email="benji@ex.com", password='h3!!oPass')
        client.post("/bookmark/", {"data": "123456"}, **{'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'})
        client.post("/bookmark/", {"data": "78910"}, **{'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'})
        self.assertEqual(["123456", "78910"], [x.planning_id for x in user.favourite_set.all()])
        client.post("/bookmark/remove/", {"data": "78910"}, **{'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'})
        self.assertEqual(["123456"], [x.planning_id for x in user.favourite_set.all()])
