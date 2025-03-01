from django.urls import path
from .views import TextClassificationAPI

urlpatterns = [
    # path('analyze/', analyze_data, name='analyze_data'),
    path("analyze/", TextClassificationAPI.as_view(), name="analyze_data"),
]
