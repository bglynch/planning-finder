### Set Up OAuth API
To set up OAuth you will need a Google Account.  
If you do not have one, set one up  - [Here](https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&flowName=GlifWebSignIn&flowEntry=SignUp)

- #### Google Console
    - Sign into Google Cloud Platform Console: https://cloud.google.com/
    
    - On the Dasboard click "CREATE PROJECT"    
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google01.png">  
    
    - Choose Project Name and click "CREATE"  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google02.png" height="500">  
    
    - Click "OAuth consent screen" in APIs & Services  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google03.png" height="200">  
    
    - Choose "EXTERNAL" and click "CREATE"  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google04.png" height="250">  
    
    - Fill in Application Name and click "SAVE"  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google05.png" height="">  
    
    - On the Credentials tab click "CREATE CREDENTIALS" -> "OAuth Client ID"  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google06.png" height="">
      
    - Fill in the credentials as below and hit "SAVE"  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google07.png" height="">  
    
    - A pop up will appear with <Client-ID-Key> and <Client-Secret-Key>, these are used later  
    <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/google08-blur.png" height="300">      

- #### Django App
    - Install django-allauth
        ```bash 
        pip install django-allauth
        ```
    
    - Add the following to INSTALLED_APPS in Django settings
        ```python
        INSTALLED_APPS = [
          ...  
          'django.contrib.sites',
          'allauth',
          'allauth.account',
          'allauth.socialaccount',
          'allauth.socialaccount.providers.google',
        ]
        ```
    - At the bottom of settings specify the allauth backend, site id an social account providers
        ```python
        # Google OAuth
        AUTHENTICATION_BACKENDS = (
            'django.contrib.auth.backends.ModelBackend',
            'allauth.account.auth_backends.AuthenticationBackend',
        )
        SITE_ID = config('SITE_ID')
        SOCIALACCOUNT_PROVIDERS = {
            'google': {
                'SCOPE': [
                    'profile',
                    'email',
                ],
                'AUTH_PARAMS': {
                    'access_type': 'online',
                }
            }
        }
        ```
    - add url
        ```python
        urlpatterns = [
            path('auth/', include('allauth.urls')),
        ]
        ```
    - Make migrations to update db
        ```bash
        $ python manage.py makemigrations
        $ python manage.py migrate    
        ```
    - Log into Django admin console
        - Sites -> + Add
          <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/admin03.png" height="">      
            - Domain name: https://bglynch-test-deployment.herokuapp.com
            - Display name: https://bglynch-test-deployment.herokuapp.com  
            
        - Social applications -> +Add (will use keys from above)
            <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/admin03.png" height="">      
            - Provider: Google
            - Name: Google API
            - Client id: <Client-ID-Key> 
            - Secret key: <Client-Secret-Key>
    
    - Get SITE_ID
       - Open a terminal  
       - Set DATABASE_URL on your terminal to url of the Hobby DB created.
           ```bash
           $ export DATABASE_URL=<value-from-config-vars>
           ```
       - log into database
           ``` bash
           $ heroku pg:psql --app bglynch-test-deployment
           ```    
       - Get the site id from the id column in the django_site table
           ```
           SELECT * from django_site;
             id |                    domain                     |                     name                      
            ----+-----------------------------------------------+-----------------------------------------------
              3 | https://bglynch-test-deployment.herokuapp.com | https://bglynch-test-deployment.herokuapp.com
              1 | example.com                                   | example.com
    
           ```
       We can see from the table that the id for the app is 3  
       
       Set ```SITE_ID = 3``` in Heroku Config Vars
 
