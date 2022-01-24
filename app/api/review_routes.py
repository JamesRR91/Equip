from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product, Review
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

review_routes= Blueprint("reviews", __name__)

@review_routes.route("/", methods=['Get'])

@review_routes.route("/<int:product_id>", methods=['Get'])

def get_products_reviews(product_id):
    all_reviews= Review.query.filter(Review.product_id == product_id)
    return {'all_reviews':[review.to_dict() for review in all_reviews]}

# fetch('/api/reviews/', {method:'Get'}).then(res => res.json()).then(data=>console.log(data))

@review_routes.route('/new', methods=["POST"])
@login_required
def add_review():
    new_review = Review(review_text=request.json['review_text'], user_id=request.json['user_id'], product_id=request.json['product_id'])
    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()

# const data = { review_text: 'This battle map has been a godsend for my group over the last couple of years, making prep a breeze.', user_id: 2, product_id: 7}

# fetch('/api/reviews/new', {
#   method: 'POST',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review=Review.query.get(id)
    db.session.delete(review)
    db.session.commit()

    return review.to_dict()

# fetch('/api/reviews/4', {method: 'delete'}).then(res => res.json()).then(data => console.log(data));

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review=Review.query.get(id)
    review.review_text=request.json['review_text']
    review.user_id=request.json['user_id']
    review.product_id=request.json['product_id']
    db.session.commit()

    return review.to_dict()
