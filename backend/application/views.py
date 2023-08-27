# Create your views here.
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import SignUpForm

# register user view
def register_user(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()  # Save the user
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, "Registration successful! You may go back.")
            return redirect('http://localhost:3000/login')
    else:
        form = SignUpForm()
    
    # Always render the template with the form
    return render(request, 'register.html', {'form': form})

# url shortening
from .models import ShortenedURL
from django.http import HttpResponseRedirect

# to pass in long url and retrieve shortened url
def shorten_url(request):
    if request.method == 'POST':
        long_url = request.POST['long_url']
        shortened_url = ShortenedURL.objects.create(long_url=long_url)
        return render(request, 'shorten_url.html', {'shortened_url': shortened_url})

    return render(request, 'shorten_url.html')

# for redirection logic
# check if shortened url matches the long url and redirect to long url
def redirect_to_original(request, short_code):
    try:
        shortened_url = ShortenedURL.objects.get(short_code=short_code)
        return HttpResponseRedirect(shortened_url.long_url)
    except ShortenedURL.DoesNotExist:
        error_message = "Please try again."
        return render(request, 'shorten_url.html', {'error_message': error_message})  