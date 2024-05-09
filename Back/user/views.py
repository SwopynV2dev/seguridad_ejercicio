from rest_framework_simplejwt.views import TokenObtainPairView
from user.serializer import  CustomTokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework import status
from django.core.cache import cache

class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        
    def post(self, request, *args, **kwargs):  

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
