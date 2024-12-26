from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
import requests
# Create your views here.

auth_url_intra = ("https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8161ed3031861bdaa58e03f4222bba43a07c00dae2ab2753ee7f5fd96421f692&redirect_uri=https%3A%2F%2Flocalhost%3A8081%2Foauth%2Flogin%2Fredirect%2F&response_type=code")
#put in an .env, maybe


def home(request : HttpRequest) -> JsonResponse:
    return JsonResponse({"msg" : "success"})

@login_required(login_url="/oauth/login/")

def get_authenticated_user(request : HttpRequest) :
    return JsonResponse({"msg": "Authenticated"})

def intra_login(request : HttpRequest):
    return redirect(auth_url_intra)

def intra_login_redirect(request : HttpRequest):
    code = request.GET["code"]
    user = exchange_code(code)
    intra_user = authenticate(request, user=user)
    intra_user = list(intra_user).pop()
    login(request, intra_user)
    return redirect("/auth/user/")

def exchange_code(code: str):
    data = {
        "client_id": "u-s4t2ud-8161ed3031861bdaa58e03f4222bba43a07c00dae2ab2753ee7f5fd96421f692", #put in an .env
        "client_secret": "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", #put in an .env
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "https://localhost:8081/oauth/login/redirect/",
        "scope": "identify"
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post('https://api.intra.42.fr/oauth/token', data=data, headers=headers)
    credentials = response.json()
    access_token = credentials['access_token']
    response = requests.get("https://api.intra.42.fr/v2/me", headers={
        "Authorization": "Bearer " + access_token
    })
    user = response.json()
    return user