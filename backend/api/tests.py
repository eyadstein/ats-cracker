import json
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase

class RegisterTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_success(self):
        res = self.client.post("/auth/register/", {
            "username": "testuser", "email": "testuser@example.com",
            "password": "StrongPass@123", "confirm_password": "StrongPass@123"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_register_password_mismatch(self):
        res = self.client.post("/auth/register/", {
            "username": "mismatch", "email": "mismatch@example.com",
            "password": "StrongPass@123", "confirm_password": "Wrong@123"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_duplicate_email(self):
        data = {"username": "user1", "email": "dup@example.com",
                "password": "StrongPass@123", "confirm_password": "StrongPass@123"}
        self.client.post("/auth/register/", data, format="json")
        res = self.client.post("/auth/register/", data, format="json")
        self.assertIn(res.status_code, [400, 403])

    def test_register_weak_password(self):
        res = self.client.post("/auth/register/", {
            "username": "weak", "email": "weak@example.com",
            "password": "123", "confirm_password": "123"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_missing_fields(self):
        res = self.client.post("/auth/register/", {"email": "missing@example.com"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

class LoginTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.client.post("/auth/register/", {
            "username": "loginuser", "email": "login@example.com",
            "password": "StrongPass@123", "confirm_password": "StrongPass@123"
        }, format="json")

    def test_login_success(self):
        res = self.client.post("/auth/login/", {
            "email": "login@example.com", "password": "StrongPass@123"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("access", res.data)
        self.assertIn("refresh", res.data)

    def test_login_wrong_password(self):
        res = self.client.post("/auth/login/", {
            "email": "login@example.com", "password": "Wrong@123"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_nonexistent_user(self):
        res = self.client.post("/auth/login/", {
            "email": "nobody@example.com", "password": "StrongPass@123"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class TokenRefreshTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.client.post("/auth/register/", {
            "username": "refreshuser", "email": "refresh@example.com",
            "password": "StrongPass@123", "confirm_password": "StrongPass@123"
        }, format="json")
        login = self.client.post("/auth/login/", {
            "email": "refresh@example.com", "password": "StrongPass@123"
        }, format="json")
        self.refresh_token = login.data.get("refresh")

    def test_refresh_success(self):
        res = self.client.post("/auth/refresh/", {"refresh": self.refresh_token}, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("access", res.data)

    def test_refresh_invalid_token(self):
        res = self.client.post("/auth/refresh/", {"refresh": "invalidtoken"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class CVTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.client.post("/auth/register/", {
            "username": "cvuser", "email": "cv@example.com",
            "password": "StrongPass@123", "confirm_password": "StrongPass@123"
        }, format="json")
        login = self.client.post("/auth/login/", {
            "email": "cv@example.com", "password": "StrongPass@123"
        }, format="json")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")

    def test_get_cv_list(self):
        res = self.client.get("/api/cv/")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_cv(self):
        res = self.client.post("/api/cv/", {
            "title": "My Resume",
            "data": json.dumps({"name": "Test User", "position": "Developer"})
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["title"], "My Resume")

    def test_get_cv_detail(self):
        create = self.client.post("/api/cv/", {
            "title": "Detail CV", "data": json.dumps({"name": "Detail"})
        }, format="json")
        res = self.client.get(f"/api/cv/{create.data['id']}/")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_cv(self):
        create = self.client.post("/api/cv/", {
            "title": "Old Title", "data": json.dumps({"name": "Old"})
        }, format="json")
        res = self.client.put(f"/api/cv/{create.data['id']}/", {
            "title": "New Title", "data": json.dumps({"name": "New"})
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["title"], "New Title")

    def test_cv_requires_auth(self):
        res = APIClient().get("/api/cv/")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_cannot_access_other_user_cv(self):
        create = self.client.post("/api/cv/", {
            "title": "Private", "data": json.dumps({"name": "Private"})
        }, format="json")
        cv_id = create.data["id"]
        self.client.post("/auth/register/", {
            "username": "other", "email": "other@example.com",
            "password": "StrongPass@123", "confirm_password": "StrongPass@123"
        }, format="json")
        login2 = self.client.post("/auth/login/", {
            "email": "other@example.com", "password": "StrongPass@123"
        }, format="json")
        other = APIClient()
        other.credentials(HTTP_AUTHORIZATION=f"Bearer {login2.data['access']}")
        res = other.get(f"/api/cv/{cv_id}/")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
