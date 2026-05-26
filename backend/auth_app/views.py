from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from auth_app.models import User
from auth_app.serializers import RegisterSerializer, CustomTokenObtainPairSerializer
import logging
from rest_framework_simplejwt.views import TokenRefreshView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

@method_decorator(csrf_exempt, name="dispatch")
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name="dispatch")
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        print("Incoming refresh token request data: ", request.data)
        print(request.headers)
        response = super().post(request, *args, **kwargs)
        return response
