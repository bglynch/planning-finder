# ==== Docker Docs
#FROM python:3
#ENV PYTHONUNBUFFERED 1
#RUN mkdir /code
#WORKDIR /code
#COPY requirements.txt /code/
#RUN pip install -r requirements.txt
#COPY . /code/
FROM python:3.7.5-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /django-app
RUN ls
WORKDIR /django-app
RUN ls
COPY . /django-app/
RUN ls

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3

WORKDIR ..

RUN wget https://download.osgeo.org/geos/geos-3.8.0.tar.bz2
RUN tar -xf geos-3.8.0.tar.bz2
RUN ls
WORKDIR /geos-3.8.0
RUN ./configure
RUN make
RUN make install
RUN ls

WORKDIR ..

RUN wget https://download.osgeo.org/proj/proj-7.0.0.tar.gz
RUN wget https://download.osgeo.org/proj/proj-datumgrid-1.8.tar.gz
RUN tar -xf proj-7.0.0.tar.gz
WORKDIR proj-7.0.0/nad
RUN tar -xf ../../proj-datumgrid-1.8.tar.gz
WORKDIR ..
RUN ./configure
RUN make
RUN make install

WORKDIR ..

RUN wget https://www.gaia-gis.it/gaia-sins/libspatialite-sources/libspatialite-4.3.0.tar.gz
RUN tar -xf libspatialite-4.3.0.tar.gz
WORKDIR /libspatialite-4.3.0
RUN ./configure
RUN make
RUN make install
RUN ls

WORKDIR ..

WORKDIR /django-app
COPY requirements.txt /django-app/
RUN pip install -r requirements.txt
COPY . /django-app/
#
#EXPOSE 7000
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]