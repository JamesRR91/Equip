import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    print("SQLALCHEMY_URI", SQLALCHEMY_DATABASE_URI)
    SQLALCHEMY_ECHO = True
