from django.contrib.auth.forms import UserCreationForm
from django import forms
# importing user model to create users in user model type
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):

    email = forms.EmailField(label="", widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "email address"}))
    first_name = forms.CharField(label="", max_length=25, widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "firstname"}))
    last_name = forms.CharField(label="", max_length=25, widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "lastname"}))

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email", "password1", "password2")

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'username'
        self.fields['username'].label = ''
        self.fields['username'].help_text = '<span class="form-text text-muted"><small>Required. Enter a unique username. This will be used for your login. Letters, digits and @/./+/-/_ only.</small></span>'

        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = 'enter your password'
        self.fields['password1'].widget.label = ''
        self.fields['password1'].help_text = '<span class="form-text text-muted"><small>Enter a strong password.</small></span>'

        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = 're-enter your password'
        self.fields['password2'].widget.label = ''
        self.fields['password2'].help_text = '<span class="form-text text-muted"><small>Re-enter your password for confirmation.</small></span>'
