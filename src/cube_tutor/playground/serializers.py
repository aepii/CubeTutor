from rest_framework import serializers

class CubeSerializer(serializers.Serializer):
    faces = serializers.DictField()