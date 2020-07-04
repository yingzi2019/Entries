from django.urls import re_path
from . import views


app_name = 'news'
urlpatterns = [
    re_path(r'^$', views.InitIndexView.as_view())
]