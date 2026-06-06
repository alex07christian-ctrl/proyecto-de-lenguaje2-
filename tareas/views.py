from rest_framework import viewsets
from .serializer import TareasSerializer, NominaSerializer
from .models import Tareas, Nomina

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AccesoSistema


class TareasView(viewsets.ModelViewSet): 
    serializer_class = TareasSerializer
    queryset = Tareas.objects.all()

class NominaViewSet(viewsets.ModelViewSet):
    serializer_class = NominaSerializer
    queryset = Nomina.objects.all()






class SetupPasswordView(APIView):
    def post(self, request):
        password = request.data.get('password')
        if not password:
            return Response({"error": "La contraseña es requerida"}, status=status.HTTP_400_BAD_REQUEST)

        # Forzamos a que siempre use el ID=1 para que sea una única contraseña global
        config, created = AccesoSistema.objects.get_or_create(id=1)
        config.cambiar_contrasena(password)
        
        return Response({"mensaje": "Contraseña maestra configurada correctamente"}, status=status.HTTP_200_OK)

class LoginPasswordView(APIView):
    def post(self, request):
        password = request.data.get('password')
        if not password:
            return Response({"error": "La contraseña es requerida"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            config = AccesoSistema.objects.get(id=1)
        except AccesoSistema.DoesNotExist:
            return Response({"error": "No se ha configurado una contraseña maestra todavía"}, status=status.HTTP_400_BAD_REQUEST)

        if config.verificar_contrasena(password):
            # Devolvemos un token ficticio o firma para que el Frontend sepa que tiene acceso legítimo
            return Response({
                "mensaje": "Acceso concedido",
                "token": "efotrop_master_secure_session_token_2026"
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña incorrecta de administración"}, status=status.HTTP_401_UNAUTHORIZED)