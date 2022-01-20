from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product
from flask_sqlalchemy import SQLAlchemy

product_routes= Blueprint("products", __name__)

@product_routes.route("/", methods=['Get'])

def get_all_products():
    all_products=Product.query.all()
    return {'all_products':[product.to_dict() for product in all_products]}
