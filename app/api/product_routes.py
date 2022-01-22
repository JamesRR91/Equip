from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required
from app.forms import PostProductForm

product_routes= Blueprint("products", __name__)

def validation_error_messages(validation_errors):
    error_messages=[]
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages

@product_routes.route("/", methods=['Get'])

def get_all_products():
    all_products=Product.query.all()
    return {'all_products':[product.to_dict() for product in all_products]}

@product_routes.route("/<int:id>")

def get_one_product(id):
    product=Product.query.get(id)
    return product.to_dict()

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
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product=Product.query.get(id)
    db.session.delete(product)
    db.session.commit()

    return product.to_dict()

@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_product(id):
    product=Product.query.get(id)
    product.product_name=request.json['product_name']
    product.product_description=request.json['product_description']
    product.product_price=request.json['product_price']
    product.product_quantity=request.json['product_quantity']
    db.session.commit()
    return product.to_dict()
