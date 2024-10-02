from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .cube_modules.cube import Cube
from .serializers import CubeSerializer
from rest_framework import status

import numpy

class CubeAPI(APIView):

    cube = Cube(empty=False)

    def get(self, request, format=None):
        serializer = CubeSerializer({'faces': self.cube.faces})
        print("GET:", serializer.data)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = CubeSerializer(data=request.data)
        if serializer.is_valid():
            updated_faces = serializer.validated_data['faces']

            for face, array in updated_faces.items():
                entry = numpy.array(array)
                self.cube.set_face(face, entry)

            print("POST:", serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
def render_cube(request):
    return render(request, 'cube_template.html')