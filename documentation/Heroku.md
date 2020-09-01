### Heroku - PostGIS Database
The project was deployed to Heroku using the following steps...  
- #### Provision a Hobby Database  
    - Log in to Heroku and go to the [dashboard page](https://dashboard.heroku.com/apps)
    - In the top right of the page, click "New" -> "Create new app"  
     <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/heroku01.png" height=100>
       
    - Give application a Name and Choose Server Location  
     <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/heroku02.png" height=200>  
       
    - Deploy Tab -> Deploy Method -> Choose "Github" as deployment method and choose repository and click "Connect"  
     <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/heroku03.png" height="">         
    
    - Add environment variables  
      Settings Tab -> Config Vars -> Add Config Vars  
        
    
- #### Provision PostGIS Database
    - Add Geo buildpack for GIS libraries  
      Settings Tab -> Buildpacks -> Add buildpack: https://github.com/heroku/heroku-geo-buildpack.git, click "Save Changes"
     <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/heroku04.png" height="300">          
    
    - Add Postgres Database 
      Resources Tab -> Add-ons -> search for Heroku Postgres, choose Hobby Dev
     <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/heroku05.png" height="300">          
     <img src="https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/documentation/heroku06.png" height="300">          
    - Install heroku cli if not installed - https://devcenter.heroku.com/articles/heroku-cli
    - Add GIS extension to postgres database  
       Open a terminal  
       Set DATABASE_URL on your terminal to url of the Hobby DB created.
       ```bash
       $ export DATABASE_URL=<value-from-config-vars>
       ```
       log into database
       ``` bash
       $ heroku pg:psql --app bglynch-test-deployment
       ```
       add extension to db
       ``` bash
       => create extension postgis;
          CREATE EXTENSION
       ```
       Check if PostGIS is installed
       ```bash
       => SELECT postgis_version();
          postgis_version
          ---------------------------------------
           2.1 USE_GEOS=1 USE_PROJ=1 USE_STATS=1
          (1 row)
       ```
    - Heroku App Dashboard -> More -> Run Console -> Heroku run bassh -> Hit Run
        ```bash
        python manage.py migrate
        python manage.py createsuperuser
  