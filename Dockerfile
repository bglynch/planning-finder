FROM python:3.7-slim-stretch
ENV PYTHONUNBUFFERED 1
RUN apt update
RUN apt install -y \
    python3-dev \
    gcc \
    spatialite-bin \
    gdal-bin \
    libsqlite3-mod-spatialite \
    wget \
    unzip
RUN mkdir /src
WORKDIR /src
ADD requirements.txt /src/
RUN pip install -r requirements.txt
ADD . /src/

