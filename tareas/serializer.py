from rest_framework import serializers
from .models import Tareas, Nomina

class TareasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tareas
        fields = '__all__'

class NominaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomina
        fields = '__all__'