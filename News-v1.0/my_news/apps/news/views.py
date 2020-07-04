from django.shortcuts import render

# Create your views here.
from django.views import View



class InitIndexView(View):
    def get(self, request):
        return