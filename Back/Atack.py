import requests
import time

import json

#$with open('/data.txt', 'r') as file:
#    data_str = file.read()

payload =   [{"username": "usuario1", "password": "clave1"},
        {"username": "carlos", "password": "Admin243."},
        {"username": "usuario3", "password": "clave3"},
        {"ususernameer": "usuario4", "password": "clave4"},
        {"username": "usuario5", "password": "clave5"}]
url = 'http://127.0.0.1:8000/api-token-auth/'


total_time = 50

start_time = time.time()

while (time.time() - start_time) < total_time:
    for data in payload:
        response = requests.post(url, data=data)
        if response.status_code == 200:
            print("La solicitud fue exitosa : ")
            print(response.text)
        else:
            print("La solicitud falló con el código de estado : ", response.status_code)
    time.sleep(1)
