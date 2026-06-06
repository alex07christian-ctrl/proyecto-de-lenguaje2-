from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Tareas(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    prioridad = models.IntegerField(default=1)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.title


class Nomina(models.Model):
    nombre_empleado = models.CharField(max_length=100)
    apellido_empleado = models.CharField(max_length=100)
    cargo = models.CharField(max_length=50)
    salario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.nombre_empleado} - {self.cargo}"


class AccesoSistema(models.Model):
    contrasena_hasheada = models.CharField(max_length=255)

    def cambiar_contrasena(self, nueva_clave):
        self.contrasena_hasheada = make_password(nueva_clave)
        self.save()

    def verificar_contrasena(self, clave_ingresada):
        return check_password(clave_ingresada, self.contrasena_hasheada)

    def __str__(self):
        return "Configuración de Contraseña Maestra"