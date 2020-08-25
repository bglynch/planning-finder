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
        - As a **Home Owner**, I would like to see if there will be any construction near my house that will impact me.
  

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
        -   The Roboto font is the main font used throughout the whole website with Sans Serif used as a fallback font
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
-   ### Home Page
    - #### Header
    
    
 


### Features Left to Implement
- Add all County Councils (currently only the 4 Dublin councils)
- Email notificaitons for users when new applicaiton submitted in their locality
- Filter planning applications by text search

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. 
For each, provide its name, a link to its official site and a short sentence of why it was used.
### Languages
- [Python](https://www.python.org/): The project uses **JQuery** to simplify DOM manipulation.
- [Javascript](https://www.javascript.com/): The project uses **JQuery** to simplify DOM manipulation.
### Frameworks
- [Django 2](https://www.djangoproject.com/): The project uses **JQuery** to simplify DOM manipulation.
- [Bootstrap](https://getbootstrap.com/): The project uses **JQuery** to simplify DOM manipulation.
### Libraries
- [Leaflet](https://leafletjs.com/): The project uses **JQuery** to simplify DOM manipulation.
- [Stripe](https://stripe.com/ie): The project uses **JQuery** to simplify DOM manipulation.
- [Jquery](https://jquery.com): The project uses **JQuery** to simplify DOM manipulation.
- [jquery-scrollintoview](https://github.com/litera/jquery-scrollintoview): The project uses **JQuery** to simplify DOM manipulation.
- [noUiSlider](https://refreshless.com/nouislider/): The project uses **JQuery** to simplify DOM manipulation.
- [Google OAuth](Google Developers Console): The project uses **JQuery** to simplify DOM manipulation.
### APIs
- [Planning Applications API](https://data.gov.ie/dataset/national-planning-applications/resource/48809edb-0e41-4c97-b037-82c319c632e7): The project uses **JQuery** to simplify DOM manipulation.
### Database
- [PostGIS](https://postgis.net/): The project uses **JQuery** to simplify DOM manipulation.
- [Spatialite](https://www.gaia-gis.it/fossil/libspatialite/index): The project uses **JQuery** to simplify DOM manipulation.
### Tools
- [DB Browser for SQLite](https://sqlitebrowser.org/): Used to examine the spatialite database.
- [PyCharm](https://www.jetbrains.com/pycharm/): IDE used to .
- [Postman](https://www.postman.com/): The project uses **JQuery** to simplify DOM manipulation.
- [TravisCI](https://www.postman.com/): The project uses **JQuery** to simplify DOM manipulation.


## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X