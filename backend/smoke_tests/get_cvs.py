import requests

url = 'http://localhost:8000/auth/login/'
email = 'marionageh11@gmail.com'
password = '00000000'

response = requests.post(url, data={'email': email, 'password': password})
token = response.json()['access']
refresh = response.json()['refresh']

# Try Refreshing the token
url = 'http://localhost:8000/auth/refresh/'
response = requests.post(url, json={'refresh': refresh},
                         headers={
                             'content-type': 'application/json',
                         }
                )
print(response.text)
# token = response.json()['access']

url = 'http://localhost:8000/api/cv/'
headers = {
    'Authorization': f'Bearer {token}'
}
response = requests.get(url, headers=headers)
print(response.json(), response.status_code)
