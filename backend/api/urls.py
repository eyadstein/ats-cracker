from django.urls import path
from .views import CVListView, CVDetailView

urlpatterns = [
    path('cv/', CVListView.as_view(), name='cv-list'),
    path('cv/<int:pk>/', CVDetailView.as_view(), name='cv-detail'),
]