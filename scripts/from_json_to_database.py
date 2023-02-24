import requests
import json

BASE_URL = 'localhost:5000'
JSON_DIR = '../angular-front/src/assets/data'

def load_json_to_db(path, route):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    for item in data:        
        r = requests.post(f'http://{BASE_URL}/api/{route}', json=item)
        print(r.status_code)

if __name__ == '__main__':
    routes = ['students', 'users', 'courses', 'enrollments']
    for route in routes:
        load_json_to_db(f'{JSON_DIR}/{route}.json', route)