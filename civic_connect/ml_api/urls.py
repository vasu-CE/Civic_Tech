from django.urls import path
from .views import predict

urlpatterns = [
    path('predict/', predict, name='predict'),
    # path('api/analyze/', analyze_data, name='analyze_data'),
]
