from django.urls import path, include
from rest_framework import routers
from tareas import views
from .views import SetupPasswordView, LoginPasswordView

router = routers.DefaultRouter()
router.register(r'tareas', views.TareasView, 'tareas')
router.register(r'nomina', views.NominaViewSet, 'nomina')

urlpatterns = [
    path("api/v1/", include(router.urls)), 
    path('api/v1/auth/setup/', SetupPasswordView.as_view(), name='auth_setup'),
    path('api/v1/auth/login/', LoginPasswordView.as_view(), name='auth_login'),
]