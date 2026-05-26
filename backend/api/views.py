import json

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import CV
from .pagination import CVPagination
from .serializers import CVSerializer

class CVListView(generics.ListCreateAPIView):
    serializer_class = CVSerializer
    pagination_class = CVPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CV.objects.all().order_by('id')
        else:
            return CV.objects.filter(user=user).order_by('id')

    def perform_create(self, serializer):
        data = serializer.validated_data.get('data')
        if isinstance(data, dict):
            serializer.validated_data['data'] = json.dumps(data)
        serializer.save(user=self.request.user)

class CVDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CVSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CV.objects.all()
        else:
            return CV.objects.filter(user=user)