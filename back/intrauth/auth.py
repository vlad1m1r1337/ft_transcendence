from django.contrib.auth.backends import BaseBackend
from .models import IntraUser

class IntraAuthenticationBackend(BaseBackend):
    def authenticate(self, request, user) -> IntraUser:
        user_found = IntraUser.objects.filter(id=user['id'])
        if len(user_found) == 0:
            print("User was not found.", flush=True)
            new_user = IntraUser.objects.create_new_intra_user(user)
            print(new_user, flush=True)
            return new_user
        print(user_found, flush=True)
        return user_found

    def get_user(self, user_id):
        try:
            return IntraUser.objects.get(pk=user_id)
        except IntraUser.DoesNotExist:
            return None