from django.urls import path
from .views import UnifiedClassificationAPI

urlpatterns = [
    # path('analyze/', analyze_data, name='analyze_data'),
    path("analyze/", UnifiedClassificationAPI.as_view(), name="analyze_data"),
]
