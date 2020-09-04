<h1 align="center">WIMBY - What's In My Backyard</h1>  

[View the live project here.](https://bglynch-planning-finder.herokuapp.com/)  

WIMBY is a simple, easy to use app for viewing planning applications in your locality.
It allows the user the ability to select a location of his choice(typically the user's home address), 
and then view on a map, planning applications nearby. 

<h2 align="center"><img src="https://github.com/bglynch/planning-finder/blob/feature/add-documentation/documentation/hero.png"></h2>
 
## User Experience (UX)

-   ### User stories

    -   #### Home Buyer
        - As a **Home Buyer**, I would like to view planning applications of the house im interested in buying so I can see floor plans of the house. 
        - As a **Home Buyer**, I would like to view planning applications of the house im interested in buying so I can see if work has been done to the house in recent years. 
        - As a **Home Buyer**, I would like to view planning applications of the houses near the house I'm interested in buying so I can see if it would be likely that I could build an extension.  
    -   #### Home Owner
        - As a **Home Owner**, I would like to see a list of recent planning in my locality so that I will aware of any construction near my house that will impact me.
    -   #### Architect
        - As a **Architect**, I would like to keep a list of planning applications of homes I find inspiring so that I can use them as a reference point when I am designing a new home.

  
-   ### Design
    -   #### Research
        - Research was done into other map based websites to get inspiration for the layout.
        <h2 align="center"><img src="https://github.com/bglynch/planning-finder/blob/feature/add-documentation/documentation/research/combined.png"></h2>
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
        -   The Roboto font is the main font used throughout the whole website with Sans Serif used as a fallback font.
    -   #### Imagery
        -   Imagery is used subtley. Images are only used of to give the user a visual feedback of which County Council a planning application belongs to.
    -   #### Map
        -   ##### Icons
            - An icon is located where a planning application has been submitted. As a property can have submitted more than one application, 
            it is possible to have several icons on the same location. 
            To overcome this, each application location is given a random offset in the X and Y direction to prevent this from happening.  
            - Icons change size depending on map zoom level to prevent overcrowding
        -   ##### Tiles 
            - Map tiles have a simple colour palette, chosen to make the icons stand out.
        -   ##### Boundaries 
            - Boundaries for County councils are shown by a strong black line.
            - County councils which are not yet added to the web app are shown with a transparent black fill.
        -   ##### Zoom and Extents 
            - The zoom and extents have been restricted to the greater Dublin Area to prevent the user from moving beyond.
            
            
-   ### Wireframes
    -   Home Page Wireframe - [View](https://github.com/)
    -   Mobile Wireframe - [View](https://github.com/)
    -   Contact Us Page Wireframe - [View](https://github.com/)            
        
## Features
- ### General
    -   Responsive on all device sizes - [Samples](documentation/Responsive.md)
- ### User
    -   Register an account using email and password
    -   Login after registering with email and password
    -   Login using Google account
    -   Choose location when registered and see all planning applications within a 1km radius
    -   Update location when logged in
    -   Ability to filter these planning applications by type
    -   Ability to filter these planning applications by date
    -   Ability to see these planning applications on a map
    -   Ability to bookmark and unbookmark applications.
    -   View all bookmarked application on Profile page
    -   Reset password
- ### Map
    -   Click map icon to see planning application description and auto scroll list to the application.
- ### List
    -   Click Airplane icon to move map to planning application location
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
    - [Django 2](https://www.djangoproject.com/): The project uses **JQuery** to simplify DOM manipulation.
    - [Bootstrap](https://getbootstrap.com/): Used for page design.
    - [Git](https://git-scm.com/): Used for version control
    - [GitHub:](https://github.com/): Used to store the projects code
    - [Leaflet](https://leafletjs.com/): Used to create the map element.
    - [Stripe](https://stripe.com/ie): Used to take card payments.
    - [Jquery](https://jquery.com): The project uses **JQuery** to simplify DOM manipulation.
    - [jquery-scrollintoview](https://github.com/litera/jquery-scrollintoview): Used to auto scroll list.
    - [noUiSlider](https://refreshless.com/nouislider/): Used to create date slider.
    - [Google OAuth](https://console.developers.google.com/): Used to allow google login.
    - [Jupyter Notebooks](https://jupyter.org/): Used for data exploration
    - [python-decouple](https://pypi.org/project/python-decouple/): library to separate the settings parameters from your source code.
    - [Docker](https://docs.docker.com/get-docker/): used to deploy the app locally.
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
    - [TravisCI](https://www.postman.com/): Used for CI/CD.


## Testing

### Code Styles
- #### CSS
    The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project.
-   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)

    <a href="http://jigsaw.w3.org/css-validator/check/referer">
    <img style="border:0;width:88px;height:31px"
        src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
        alt="Valid CSS!" />
    </a>
- #### Javascript
    
- #### Python
    Used IDE plugin to keep my code aligned to PEP 8 format.

### Testing User Stories from User Experience (UX) Section

-   #### First Time Visitor Goals

    1. As a First Time Visitor, I want to easily understand the main purpose of the site and learn more about the organisation.

        1. Upon entering the site, users are automatically greeted with a clean and easily readable navigation bar to go to the page of their choice. Underneath there is a Hero Image with Text and a "Learn More" Call to action button.
        2. The main points are made immediately with the hero image
        3. The user has two options, click the call to action buttons or scroll down, both of which will lead to the same place, to learn more about the organisation.

    2. As a First Time Visitor, I want to be able to easily be able to navigate throughout the site to find content.

        1. The site has been designed to be fluid and never to entrap the user. At the top of each page there is a clean navigation bar, each link describes what the page they will end up at clearly.
        2. At the bottom of the first 3 pages there is a redirection call to action to ensure the user always has somewhere to go and doesn't feel trapped as they get to the bottom of the page.
        3. On the Contact Us Page, after a form response is submitted, the page refreshes and the user is brought to the top of the page where the navigation bar is.

    3. As a First Time Visitor, I want to look for testimonials to understand what their users think of them and see if they are trusted. I also want to locate their social media links to see their following on social media to determine how trusted and known they are.
        1. Once the new visitor has read the About Us and What We Do text, they will notice the Why We are Loved So Much section.
        2. The user can also scroll to the bottom of any page on the site to locate social media links in the footer.
        3. At the bottom of the Contact Us page, the user is told underneath the form, that alternatively they can contact the organisation on social media which highlights the links to them.

-   #### Returning Visitor Goals

    1. As a Returning Visitor, I want to find the new programming challenges or hackathons.

        1. These are clearly shown in the banner message.
        2. They will be directed to a page with another hero image and call to action.

    2. As a Returning Visitor, I want to find the best way to get in contact with the organisation with any questions I may have.

        1. The navigation bar clearly highlights the "Contact Us" Page.
        2. Here they can fill out the form on the page or are told that alternatively they can message the organisation on social media.
        3. The footer contains links to the organisations Facebook, Twitter and Instagram page as well as the organization's email.
        4. Whichever link they click, it will be open up in a new tab to ensure the user can easily get back to the website.
        5. The email button is set up to automatically open up your email app and autofill there email address in the "To" section.

    3. As a Returning Visitor, I want to find the Facebook Group link so that I can join and interact with others in the community.
        1. The Facebook Page can be found at the footer of every page and will open a new tab for the user and more information can be found on the Facebook page.
        2. Alternatively, the user can scroll to the bottom of the Home page to find the Facebook Group redirect card and can easily join by clicking the "Join Now!" button which like any external link, will open in a new tab to ensure they can get back to the website easily.
        3. If the user is on the "Our Favourites" page they will also be greeted with a call to action button to invite the user to the Facebook group. The user is incentivized as they are told there is a weekly favourite product posted in the group.

-   #### Frequent User Goals

    1. As a Frequent User, I want to check to see if there are any newly added challenges or hackathons.

        1. The user would already be comfortable with the website layout and can easily click the banner message.

    2. As a Frequent User, I want to check to see if there are any new blog posts.

        1. The user would already be comfortable with the website layout and can easily click the blog link

    3. As a Frequent User, I want to sign up to the Newsletter so that I am emailed any major updates and/or changes to the website or organisation.
        1. At the bottom of every page their is a footer which content is consistent throughout all pages.
        2. To the right hand side of the footer the user can see "Subscribe to our Newsletter" and are prompted to Enter their email address.
        3. There is a "Submit" button to the right hand side of the input field which is located close to the field and can easily be distinguished.

### Further Testing

-   The Website was tested on Google Chrome, Firefox and Safari browsers.
-   The website was viewed on a variety of devices such as Desktop, Laptop, Tablet and Phone.
-   A large amount of testing was done to ensure that all pages were linking correctly.

### Known Bugs

## Deployment
These were steps taken to deploy the application.
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
      


### Forking the GitHub Repository

By forking the GitHub Repository we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original repository by using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/)
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
     $ docker-compose up --build -d
     
     # create a superuser
     docker exec -it planning-finder_web_1 bash
     $ python manage.py createsuperuser
     ```


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

### Content
-   All content was written by the developer.

### Media
-   Images are taken from the relevent county council websites.

### Acknowledgements
-   My Mentor for continuous helpful feedback.
-   Tutor support at Code Institute for their support.





