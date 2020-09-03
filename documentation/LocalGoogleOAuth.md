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
    - Log into Django admin console as superuser
        - Sites -> + Add
            - Domain name: http://0.0.0.0:8000
            - Display name: http://0.0.0.0:8000
        - Social applications -> +Add (will use keys from above)
            - Provider: Google
            - Name: Google API
            - Client id: <Client-ID-Key> 
            - Secret key: <Client-Secret-Key>
    
    - Get SITE_ID
    ```bash
    $ sqlite3 db4.sqlite3
    sqlite> .mode column
    sqlite> .width 3 -20 -20
    sqlite> .headers on
    sqlite> SELECT * from django_site;
    id                   name                domain
    ---  --------------------  --------------------
    1             example.com           example.com
    2            0.0.0.0:8000          0.0.0.0:8000
    ```   
    Set ```SITE_ID=2``` in .env file to match the id of 0.0.0.0:8000 in the django_site table.
    
    Now when you run the app, you will be able to login with your Google account.
 
