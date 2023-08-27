from django.http import JsonResponse
from rest_framework.response import Response
# importing an api view decorator
# import permission_classes for private routing
from rest_framework.decorators import api_view, permission_classes
# import authenticated permission to check if the person is actually authenticated to view the private routes
from rest_framework.permissions import IsAuthenticated

# to customize our tokens
# in urls.py, we have used built-in views/functions to obtain  access/refresh token pair
# inorder to customize/encrypt things further into the token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# incase notes section is to be used
# import the serialized content
# from .serializers import NoteSerializer
# from ..models import Note

# inorder to customize the token, first we override
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # we have access to the user object, therefore we can encrypt user details that we prefer along with the token
        # accessing the super() such that we obtain the base token
        token = super().get_token(user)

        # Add custom claims
        # adding/encrypting username to our base token
        token['username'] = user.username

        return token

# after customizing the token, we again view/obtain it
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# function to return all the routes in the application using rest_framework Response and api_view decorator
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


# incase a basic note retrieval is to be made
# function to serialize
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     # notes = user.note_set.all()
#     notes = Note.objects.all()
#     serializer = NoteSerializer(notes, many=True)

#     return Response(serializer.data)