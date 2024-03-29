# syntax = docker/dockerfile:1.2
FROM node:12 AS build-stage
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://equip-etsy-clone.herokuapp.com/

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env flask db upgrade
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env flask seed all

# Run flask environment
CMD gunicorn app:app
