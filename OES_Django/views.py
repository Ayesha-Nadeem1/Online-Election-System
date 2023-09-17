from django.http import HttpResponse
from django.shortcuts import render

def loginPage(request):
    data={
        'title':'Online Election System'
    }
    return render(request,'login.html')