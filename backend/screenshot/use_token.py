import requests

url = 'http://127.0.0.1:8009/api-auth-token/'
json = {'username': 'bob', 'password': 'restapi'}

response = requests.post(url, json=json)

print(response.status_code)
print(response.json())
