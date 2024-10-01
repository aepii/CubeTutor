from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .cube_modules.cube import Cube
from .serializers import CubeSerializer

class CubeAPI(APIView):
    def get(self, request, format=None):
        cube = Cube(empty=False)
        serializer = CubeSerializer({'faces': cube.faces})
        return Response(serializer.data)
    
def render_cube(request):
    return render(request, 'cube_template.html')  # Serve the template