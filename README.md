<h1 align="center">WIMBY - What's In My Backyard</h1>  

<img src="https://travis-ci.org/bglynch/planning-finder.svg?branch=master&amp;status=passed" alt="build:passed">  
---  

[View the live project here.](https://bglynch-planning-finder.herokuapp.com/)  

WIMBY is a simple, easy to use app for viewing planning applications in your locality.
It allows the user the ability to select a location of his choice(typically the user's home address), 
and then view on a map, planning applications nearby. 

<h2 align="center"><img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/hero.png"></h2>
 
## User Experience (UX)

-   ### User stories

    -   #### Home Buyer
        - As a **Home Buyer**, I would like to view planning applications of the house im interested in buying so I can see floor plans of the house. 
        - As a **Home Buyer**, I would like to view planning applications of the house im interested in buying so I can see if work has been done to the house in recent years. 
        - As a **Home Buyer**, I would like to view planning applications of the houses near the house I'm interested in buying so I can see if it would be likely that I could build an extension.  
    -   #### Home Owner
        - As a **Home Owner**, I would like to see a list of recent planning in my locality so that I will aware of any construction near my house that will impact me.
    -   #### Architect
        - As an **Architect**, I would like to keep a list of planning applications of homes I find inspiring so that I can use them as a reference point when I am designing a new home.

  
-   ### Design
    -   #### Research
        - Research was done into other map based websites to get inspiration for the layout.
        <h2 align="center"><img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/design/combined.png"></h2>
    -   #### Colour Scheme
        -   The main call to action colour in used is Blue.
        -   Differing colours are given to a application depending on the outcome.
            - Mustard: Applications where the outcome is not yet decided
            - Green:   Applications which have been accepted
            - Red:     Applications which have been refused
            - Maroon:  Applications which were invalid
            - Purple:  Applications where additional information was sought by the planning authority
            - Navy:    Applications which have been withdrawn
    -   #### Typography
        -   The Roboto font is the main font used throughout the whole website with Sans Serif used as a fallback font. I chose Roboto as it is a simple, clean and easy to read font.
    -   #### Imagery
        -   Imagery is used subtly. Images and iconography are only used of to give the user visual feedback of which County Council a planning application belongs to.
    -   #### Map
        -   ##### Icons
            - An icon (or marker) is located where a planning application has been submitted. As a property can have more than one application associated, 
            it is possible to have several icons on the same location. 
            To overcome this, each application location is given a random offset in the X and Y direction to prevent this from happening.  
            - Icons change size depending on map zoom level to prevent overcrowding
        -   ##### Tiles 
            - Map tiles have a simple colour palette, chosen to make the icons stand out.
        -   ##### Boundaries 
            - Boundaries for County councils are shown by a strong black line.
            - County councils which are not yet added to the web app are shown with a transparent black fill.
        -   ##### Zoom and Extents 
            - The zoom and extents have been restricted to the greater Dublin Area to prevent the user from moving beyond this territory. For the purpose of this project, the app focuses on the Dublin area only.
            
            
-   ### Wireframes
    -   Home Page Wireframe - [View](https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/design/wireframes.jpg)
         
        
## Features
- ### General
    -   Responsive on all device sizes - [Samples](documentation/Responsive.md)
- ### User
    -   Register an account using email and password
    -   Login after registering with email and password
    -   Login using Google account
    -   Choose location when registered and see all planning applications within a 1km radius
    -   Ability to filter these planning applications by type
    -   Ability to filter these planning applications by date
    -   Ability to see these planning applications on a map
    -   Ability to bookmark and unbookmark applications
    -   View all bookmarked applications on Profile page
    -   Ability to set a new location for a logged in user
    -   Reset password
- ### Map
    -   Click map icon to see planning application description and auto scroll list to the application.
- ### List
    -   Click Airplane icon on list item to move map to planning application location
    -   Link to application to view documents on Council website
- ### Payment
    -   User has ability to donate the price of a coffee to the developer


- ### Future Vision Features
    - Add all County Councils (currently only the 4 Dublin councils)
    - Email notifications for users when new application submitted in their locality
    - Filter planning applications by description text search
    - Store API data on my database and provision a cron job to regularly update it.  
        Currently the way I get data is limited to the constraints of the public API.

## Technologies Used
- ### Languages
    - [Python](https://www.python.org/)
    - [Javascript](https://www.javascript.com/)
    - [HTML5](https://en.wikipedia.org/wiki/HTML5)
    - [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- ### Frameworks, Libraries
    - [Django 2](https://www.djangoproject.com/): Backend python framework.
    - [Bootstrap](https://getbootstrap.com/): Used for layout, styling and responsiveness.
    - [Git](https://git-scm.com/): Used for version control
    - [GitHub:](https://github.com/): Used to store the projects code
    - [Leaflet](https://leafletjs.com/): Used to create the map element.
    - [Stripe](https://stripe.com/ie): Used to process card payments.
    - [Jquery](https://jquery.com): The project uses **JQuery** to simplify DOM manipulation.
    - [jquery-scrollintoview](https://github.com/litera/jquery-scrollintoview): Used to auto scroll list.
    - [noUiSlider](https://refreshless.com/nouislider/): Used to create date slider.
    - [Google OAuth](https://console.developers.google.com/): Used to allow google login.
    - [Jupyter Notebooks](https://jupyter.org/): Used for data exploration
    - [python-decouple](https://pypi.org/project/python-decouple/): library to separate the settings parameters from your source code.
    - [Docker](https://docs.docker.com/get-docker/): used to containerise and deploy the app locally.
- ### API
    - [Planning Applications API](https://data.gov.ie/dataset/national-planning-applications/resource/48809edb-0e41-4c97-b037-82c319c632e7): Opensource planning application data.
- ### Database
    - [PostGIS](https://postgis.net/): Production GIS database.
    - [Spatialite](https://www.gaia-gis.it/fossil/libspatialite/index): Development GIS database.
- ### Tools
    - [DB Browser for SQLite](https://sqlitebrowser.org/): Used to examine the spatialite database.
    - [pgAdmin](https://www.pgadmin.org/): Used to examine the PostGis database.
    - [PyCharm](https://www.jetbrains.com/pycharm/): IDE used for python/django development.
    - [Postman](https://www.postman.com/): Used to test API.
    - [TravisCI](https://travis-ci.org/): Used for CI/CD.


## Testing

### Code Styles
- #### CSS
    The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project.

    ##### W3C limitations
    W3C does not yet support CSS variables (or custom properties), and as a result the validator flags errors relating to CSS variables. 
    There is an open GitHub issue requesting a fix to this bug [here](https://github.com/w3c/css-validator/issues/111).
    To validate my syntax for CSS variables, I consulted the Using CSS custom properties section of [MND web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
    
    W3C does not support the use of cx and cy properties, relating to SVGs, and also flags an issue. 
    To validate my syntax for SVG properties, I consulted the SVG attributes section of [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).
    
    -   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)
    
- #### Javascript
     [JSHint](https://jshint.com/) used for linting
    
- #### Python
    Used IDE plugin to keep my code aligned to PEP 8 format.

### Testing User Stories from User Experience (UX) Section

-   #### Home Buyer
    1. I would like to view planning applications of the house im interested in buying so I can easily access the floor plans from the council website.
        1. Anne is looking to buy a property in Rathmines.
        2. Anne goes to the landing page and clicks on 'Login/Register'.
        3. Anne selects Login with Google, selects her google account and is signed in.
        4. Anne is prompted to set her location, she navigates on the map to her location of interest, selects the marker icon, drops it on the map, and clicks 'Set Location'.
        5. Anne is redirected to the landing page with the map zoomed in on her location.
        6. Anne sees a green marker on the property she is looking to buy.
        7. Anne clicks on the marker, this auto-scrolls the list and highlight the related application in grey.
        8. Anne clicks on 'View Planning', this opens a new tab redirecting her the the Planning Application on the councils website.
        9. From here she clicks on the 'Floor Plans' link to view floor plans of the property.
    
    2. I would like to view planning applications of the house im interested in buying so I can see if work has been done to the house in recent years.
        1. Bob logs in and sets his location and see the property he is interested in (See steps 1-5 taken by Anne above).
        2. Bob sees a 2 green markers on the property he is interested in.
        3. For each marker, 
            - Bob clicks on the marker, this auto-scrolls the list and highlight the related application in grey.
            - Bob clicks on View Planning, this opens a new tab redirecting him the the Planning Application on the councils website.
            - Bob can see application details. This helps him understand what has been done to the house in recent years.
            
    3. I would like to view planning applications of the houses near the house I'm interested in buying so I can see if it would be likely that I could build an extension.
        1. Charlie logs in and sets his location and see the property he is interested in (See steps 1-5 taken by Anne above).
        2. Charlie sees a red marker over the property he is interested in, indicating that it has been refused planning in the past.
        3. Charlie clicks on the marker, this auto-scrolls the list and highlight the related application in grey.
        4. Charlie clicks on 'View Planning', this opens a new tab redirecting him the the Planning Application on the councils website.
        5. From here he can see that the application was refused permission for a rear extension to the back of the house due to a public main running through the rear garden.
        6. This informs his decision to not purchase the property, as the current floor size of the house is not big enough for what he needs.
        

-   #### Home Owner
    1. I would like to see a list of recent planning in my locality so that I will aware of any construction near my house that will impact me.
        1. Dianna is a previous user.
        2. See logs in and her location is already set to her home.
        3. See can see on the map that there are 4 new mustard coloured markers (indicating pending applications) compared to the last time she viewed the map.
        4. She can see from viewing the applications that one of the markers is a planning application for a large project.
        5. After getting this info, she puts in an appeal to the council that building works required to implement the development to only be carried out at reasonable times of the day to avoid early morning and late evening noise pollution.
        

-   #### Architect
    1. I would like to keep a list of planning applications of homes I find inspiring so that I can use them as a reference point when I am designing a new home.
        1. Ellie already has an account.
        2. While driving around Dublin she noticed an interesting extension to a property in Darty.
        3. She logs into her WIMBY account on her phone, and updates her location to the location of interest.
        4. She see a green marker over the property indicated the granted planning application associated with the extension.
        5. She clicks on the marker, this auto-scrolls the list and highlight the related application in grey.
        6. She clicks the bookmark item on the application to be able to easily view it at a later date.
        

### Further Testing

-   The Website was tested on Google Chrome, Firefox and Safari browsers.
-   The website was viewed on a variety of devices such as Desktop, Laptop, Tablet and Phone.
-   A large amount of testing was done to ensure that all pages were linking correctly.

### Known Bugs
- #### Map
    - (Fixed) Planning applications with same location, meaning map icons on top of each other and one or more unclickable.
        - Fix: added slight random variance to the lat/lng of each marker. **static/js/function.js/addSlightVarianceToLatLng(latlng)**
    - (Fixed) Planning applications very close to other application, icons overlapping and difficult to click certain icons.
        - Fix: resized icons to me smaller when zoomed in. **static/js/map.js**
    - (Fixed) When user location near border of unavailable county council, map would render icons from unavailable councils.
        - Fix: before a point is added to the map, the council string of the point is checked against a list of allowed councils. **static/js/map.js**

- #### Choosing location
    - (Fixed) User able to choose location outside available county councils
        - Fix: When users submits the choose location form, before the database is updated, the location is checked.**users/views.py/point_in_allowed_council(point)**


## Deployment
These were steps taken to deploy the application.
- ### Github
    Github is used for the code repository. It is also useful for its integration with Heroku and Travis CI.

- ### Set Up Email
    [Create and account with Google](https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&flowName=GlifWebSignIn&flowEntry=SignUp)

- ### Heroku
    The production verison of the project was deployed to Heroku using a PostGIS database.  
    The deployment steps are described [Here](documentation/Heroku.md)

- ### Set Up OAuth API
    To allow users to login with their Google account, Google OAuth was added to the project.  
    The setup steps are described [Here](documentation/GoogleOAuth.md)

- ### AWS  
    Static files for the application were stored in a AWS S3 bucket.  
    Official docs showing the steps taken to provision the S3 bucket can be found [Here](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)

- ### Travis CI
    Travis CI is used for CI/CD. Documentation on Travis can be found [Here](https://docs.travis-ci.com/)
      


### Forking the GitHub Repository

By forking the GitHub Repository we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original repository by using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/bglynch/planning-finder)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone
 - If not already installed, get [Docker](https://docs.docker.com/get-docker/)
 - Open your terminal, clone the repo and rename the .env file
     ```bash
     $ git clone https://github.com/bglynch/planning-finder.git
     $ cd planning-finder/
     $ mv .env.example .env
     ```
 - Docker commands
    ```bash
    # start the server in the background
    $ docker-compose up --build
    ```
    You will see the following 
    ```bash
    web_1  | System check identified no issues (0 silenced).
    web_1  | September 12, 2020 - 12:27:28
    web_1  | Django version 2.2.10, using settings 'planning_finder.settings.prod'
    web_1  | Starting development server at http://0.0.0.0:8000/
    web_1  | Quit the server with CONTROL-C.
    ```
    Click on  [http://0.0.0.0:8000/](http://0.0.0.0:8000/) to view the landing page
    
    To create a superuser.  
    While the docker container is running, enter the following command into a new terminal
    ```bash
    docker exec -it planning-finder_web_1 bash
    $ python manage.py createsuperuser
     ```
    
    If you encounter any issues with Docker, please consult official docker documentation [Here](https://docs.docker.com/)


 At this point the app will work but will not have the full feature set
 - ### Steps to add the remaning features
    - #### Password Reset
        - Set up gmail accout.
        - Add google email address and password to .env
             ```.env
            EMAIL_HOST_USER = '<your-google-email>'
            EMAIL_HOST_PASSWORD = '<your-google-password>'
            ```
    - #### Google Login
        - Follow the steps [Here](documentation/LocalGoogleOAuth.md)

### Issues
If you encounter any issues with the source code, please raise an Issue on this github repo and include any pertinent information to replicate the issue.

### Contributions
- #### Code
    If you would like to make a code contribution, please create a Pull Request and assign me as reviewer.
- #### Coffee
    If you enjoyed the app and would like to make a donation, you can purchase a coffee for me by clicking on the coffee icon in the bottom right hand corner of the landing page.


## Credits
### Code
   - #### Backend
        -   Extending User Model Using a Custom Model Extending AbstractBaseUser: [Blogpost](https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html)
        -   How to Use Python Decouple: [Blogpost](https://simpleisbetterthancomplex.com/2015/11/26/package-of-the-week-python-decouple.html)
        -   How to connect PGAdmin (PostgreSQL) to Heroku: [Blogpost](https://www.jhipster.tech/tips/028_tip_pgadmin_heroku.html)
        -   Django CSRF Token without forms: [Stackoverflow](https://stackoverflow.com/questions/7827079/django-csrf-token-without-forms)
   - #### Frontend
        -   Leaflet, Resize marker on zoom: [Stackexchange](https://gis.stackexchange.com/questions/216558/leaflet-resize-markers-in-layer-when-zoom-in)
        -   Bootstrap, close dropdown when clicked elsewhere: [Stackoverflow](https://stackoverflow.com/questions/52166136/close-bootstrap-dropdown-only-when-mouse-is-clicked-outside-of-dropdown)
        -   Generate favicon from text: [favicon.io](https://favicon.io/favicon-generator/)
        -   SVG Icons: [Bootstrap Icons](https://icons.getbootstrap.com/)

### Content
-   All content was written by the developer.

### Media
-   Images are taken from the relevant county council websites.

### Acknowledgements
-   I would like to thank my Code Institute instructors Richard and Matt.

