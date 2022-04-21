from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product, cart
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

cart_routes = Blueprint("cart", __name__)

@cart_routes.route("/", methods=['Get'])
@login_required
def get_all_cart():
    all_cart_items = db.session.query(cart).join(Product).filter(Product.userId == current_user.get_id())
    return {'all_cart_items': [{'userid': cart.user_id,'productid': cart.product_id, 'quantity': cart.quantity} for cart in all_cart_items]}
# fetch('/api/taggednotes/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data))

@cart_routes.route('/new_cart', methods=["POST"])
@login_required
def add_cart():
  user_id=request.json['user_id']
  new_note=Note.query.get(noteId)
  tagId=request.json['tagId']
  new_tag=Tag.query.get(tagId)
  new_note.tags.append(new_tag)
  db.session.commit()

  return {'tagId': tagId,'noteId': noteId}

# const data = { tagId: 5, noteId: 7}

# fetch('/api/taggednotes/new_cart', {
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
@cart_routes.route('/', methods=["DELETE"])
@login_required
def delete_cart():
  print('NOTE NOTE', request.json)
  noteId=request.json['noteId']
  deleting_note=Note.query.get(noteId)
  tagId=request.json['tagId']
  deleting_tag=Tag.query.get(tagId)
  deleting_note.tags.remove(deleting_tag)
  db.session.commit()

  return {'tagId': tagId,'noteId': noteId}

# const data = { tagId: 1, noteId: 4}

# fetch('/api/taggednotes/', {
#   method: 'DELETE',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })

