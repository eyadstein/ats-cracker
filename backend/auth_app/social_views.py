import requests
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken
from auth_app.models import User
import os

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh["email"] = user.email
    refresh["username"] = user.username
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }

def github_callback(request):
    code = request.GET.get("code")
    if not code:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_code")

    token_res = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": os.getenv("GITHUB_CLIENT_ID"),
            "client_secret": os.getenv("GITHUB_CLIENT_SECRET"),
            "code": code,
        }
    )
    token_data = token_res.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_token")

    user_res = requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    github_user = user_res.json()

    email = github_user.get("email")
    if not email:
        emails_res = requests.get(
            "https://api.github.com/user/emails",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        emails = emails_res.json()
        primary = next((e for e in emails if e.get("primary") and e.get("verified")), None)
        email = primary["email"] if primary else None

    if not email:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_email")

    username = github_user.get("login", email.split("@")[0])
    user, created = User.objects.get_or_create(email=email, defaults={"username": username})
    if created:
        user.set_unusable_password()
        user.save()

    tokens = get_tokens_for_user(user)
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    return redirect(
        f"{frontend_url}/auth/callback?"
        f"access={tokens['access']}&refresh={tokens['refresh']}"
        f"&username={user.username}&email={user.email}"
    )


def google_callback(request):
    code = request.GET.get("code")
    if not code:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_code")

    token_res = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "redirect_uri": f"{os.getenv('BACKEND_URL', 'http://localhost:8000')}/auth/google/callback/",
            "grant_type": "authorization_code",
        }
    )
    token_data = token_res.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_token")

    user_res = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    google_user = user_res.json()

    email = google_user.get("email")
    if not email:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_email")

    username = google_user.get("name", email.split("@")[0]).replace(" ", "_")
    user, created = User.objects.get_or_create(email=email, defaults={"username": username})
    if created:
        user.set_unusable_password()
        user.save()

    tokens = get_tokens_for_user(user)
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    return redirect(
        f"{frontend_url}/auth/callback?"
        f"access={tokens['access']}&refresh={tokens['refresh']}"
        f"&username={user.username}&email={user.email}"
    )


def microsoft_callback(request):
    code = request.GET.get("code")
    if not code:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_code")

    token_res = requests.post(
        "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        data={
            "code": code,
            "client_id": os.getenv("MICROSOFT_CLIENT_ID"),
            "client_secret": os.getenv("MICROSOFT_CLIENT_SECRET"),
            "redirect_uri": f"{os.getenv('BACKEND_URL', 'http://localhost:8000')}/auth/microsoft/callback/",
            "grant_type": "authorization_code",
        }
    )
    token_data = token_res.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_token")

    user_res = requests.get(
        "https://graph.microsoft.com/v1.0/me",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    ms_user = user_res.json()

    email = ms_user.get("mail") or ms_user.get("userPrincipalName")
    if not email:
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/?error=no_email")

    username = ms_user.get("displayName", email.split("@")[0]).replace(" ", "_")
    user, created = User.objects.get_or_create(email=email, defaults={"username": username})
    if created:
        user.set_unusable_password()
        user.save()

    tokens = get_tokens_for_user(user)
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    return redirect(
        f"{frontend_url}/auth/callback?"
        f"access={tokens['access']}&refresh={tokens['refresh']}"
        f"&username={user.username}&email={user.email}"
    )
