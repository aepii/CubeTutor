from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .cube_modules.cube import Cube
from .serializers import CubeSerializer
from rest_framework import status

import numpy

cube = Cube(empty=False)

class CubeAPI(APIView):

    def get(self, request, format=None):
        print("GET", cube)
        serializer = CubeSerializer({'faces': cube.faces})
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = CubeSerializer(data=request.data)
        if serializer.is_valid():
            updated_faces = serializer.validated_data['faces']

            for face, array in updated_faces.items():
                entry = numpy.array(array)
                cube.set_face(face, entry)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CubeRotationsAPI(APIView):

    def post(self, request, format=None):
        if 'face' and 'clockwise' in request.data:
            print(f"BEFORE LOGIC ROTATE: {cube}")
            face, clockwise = request.data['face'], request.data['clockwise']
            cube.rotate_face(face, clockwise) 
            print(f"AFTER LOGIC ROTATE: {cube}")
            serializer = CubeSerializer({'faces': cube.faces})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid rotation data'}, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return render(request, 'index.html')

def render_cube(request):
    return render(request, 'playground.html')