import requests
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken
from auth_app.models import User
from api.models import CV
import json, os

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
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}?error=no_code")

    # Exchange code for access token
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
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}?error=no_token")

    # Get user info from GitHub
    user_res = requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    github_user = user_res.json()

    # Get email if not public
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
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}?error=no_email")

    username = github_user.get("login", email.split("@")[0])

    # Get or create user
    user, created = User.objects.get_or_create(
        email=email,
        defaults={"username": username}
    )
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
