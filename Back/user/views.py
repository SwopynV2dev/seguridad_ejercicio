from rest_framework_simplejwt.views import TokenObtainPairView
from user.serializer import  CustomTokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework import status
from django.core.cache import cache

class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        
    def post(self, request, *args, **kwargs):  
        ip = request.META.get('REMOTE_ADDR')

        ip_key = f"login_ip_{ip}"
        ip_count = cache.get(ip_key, 0)
        if ip_count >= 30:
            return JsonResponse({'message': 'Demasiadas solicitudes desde esta dirección IP'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        cache.set(ip_key, ip_count + 1, timeout=10)  

        username = request.data.get('username', '')
        password = request.data.get('password', '')
        

        user = authenticate(username=username, password=password)

        if user is not None:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                data = {
                    'access_token': login_serializer.validated_data.get('access'),
                    'refresh_token': login_serializer.validated_data.get('refresh'),
                }
                return JsonResponse({'data': data, 'message': 'Bienvenido, sus credenciales son correctas.'})
            return JsonResponse({'message': 'Error al generar los tokens.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return JsonResponse({'message': 'Error de autenticación.'}, status=status.HTTP_401_UNAUTHORIZED)
