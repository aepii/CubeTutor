"""
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import CubeAPI, CubeRotationsAPI, render_cube, home

urlpatterns = [
    path('home/', home, name='home'),
    path('api/cube/', CubeAPI.as_view(), name='cube_api'),
    path('api/cube/rotate/', CubeRotationsAPI.as_view(), name='cube_rotations_api'),
    path('playground/', render_cube, name='render_cube')
]
