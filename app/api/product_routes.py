from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product
from flask_sqlalchemy import SQLAlchemy

product_routes= Blueprint("products", __name__)

@product_routes.route("/", methods=['Get'])

def get_all_products():
    all_products=Product.query.all()
    return {'all_products':[product.to_dict() for product in all_products]}

@product_routes.route("/create_product", methods=['POST'])
@login_required
def add_product():
    create_product = Product(product_name=request.json['product_name'],
    product_description=request.json['product_description'],
    product_price=request.json['product_price'],
    product_quantity=request.json['product_quantity'],
    user_id=current_user.get_id())
    db.session.add(create_product)
    db.session.commit()

    return create_product.to_dict()
# const data = { product_name: 'Dungeon Master Screen', product_description: 'For the untrusting DM to instill fear in their players.', product_price: 24.99, product_quantity: 4, user_id: 1}

# fetch('/api/products/create_product', {
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
