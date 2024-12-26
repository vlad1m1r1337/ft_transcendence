from django.http import JsonResponse
from django.shortcuts import redirect
import requests
from django.conf import settings

def oauth_callback(request):
    authorization_code = request.GET.get('code')
    if not authorization_code:
        return JsonResponse({'error': 'Authorization code is missing'}, status=400)

    token_url = 'https://api.intra.42.fr/oauth/token'
    payload = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'code': authorization_code,
        'redirect_uri': settings.REDIRECT_URI,
    }

    try:
        response = requests.post(token_url, data=payload)
        response_data = response.json()

        if response.status_code != 200:
            return JsonResponse({'error': response_data['error']}, status=400)

        access_token = response_data['access_token']
        return redirect('https://localhost:8081/')
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)