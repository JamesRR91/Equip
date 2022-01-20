from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product, Review
from flask_sqlalchemy import SQLAlchemy

review_routes= Blueprint("reviews", __name__)

@review_routes.route("/", methods=['Get'])

def get_all_reviews():
    all_reviews= Review.query.filter(Review.product_id == Product.id)
    return {'all_reviews':[review.to_dict() for review in all_reviews]}
