from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Product, Cart, CartProduct
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

cart_routes = Blueprint("cart", __name__)

cart_routes = Blueprint('shopping_cart', __name__)

@cart_routes.route('/<int:userId>')
def shopping_cart(userId):
  cart = Cart.query.filter(Cart.userId == userId).first()
  if not cart:
    cart = Cart(
            id = len(Cart.query.all()) + 1,
            userId=userId,
            total=0
    )
    db.session.add(cart)
    db.session.commit()
  
  cartProducts = CartProduct.query.filter(CartProduct.cartId == cart.id).order_by(CartProduct.productId).all()
  # for value in cartProducts:
  #   if obj[value.productId]:
  #     obj[value.productId].quantity+=1
  #   else:
  #     obj[value.productId]=value
  #   print(obj)
  #   print(cartProducts)


  cartProducts = [item.to_dict() for item in cartProducts]

  newTotal = 0
  for item in cartProducts:
    itemExists = db.session.query(db.exists().where(CartProduct.productId==item['productId'])).scalar()
    product = Product.query.get(item['productId'])
    product = product.to_dict()
    # if itemExists:
    #   item['quantity']+=1
    # else:item['quantity']==1
    newTotal = newTotal + (product['product_price'] * item['quantity'])
  
  cart.total = newTotal
  cart = cart.to_dict()
  # print('PRODUCT', product)
  # print('CART OBJ', cartObj)
  return {
    'cart': cart,
    'cartProducts': cartProducts
  }


@cart_routes.route('/<int:userId>/<int:productId>', methods=['POST'])
def add_Item(userId, productId):
  data = request.json
  cart = Cart.query.filter(Cart.userId == userId).first()
  product = Product.query.filter(Product.id == productId).first()
  
  if not cart:
    cart = Cart(
            userId=userId,
            total=0
    )
    db.session.add(cart)
    db.session.commit()

  cartProducts = CartProduct.query.filter(CartProduct.cartId == cart.id).order_by(CartProduct.productId).all()
  cartProducts = [item.to_dict() for item in cartProducts]

  newCartProduct = CartProduct(
    productId=productId,
    cartId=cart.id,
    quantity=1
  )
  newItem = newCartProduct.to_dict()
  # oneItem=cartProducts.filter(CartProduct.productId == newItem['productId']).first()
  # upItem=oneItem.to_dict()
  # itemExists = db.session.query(db.exists().where(CartProduct.productId==newItem['productId'])).scalar()
  if not any(item['productId'] == newItem['productId'] for item in cartProducts):
    db.session.add(newCartProduct)
    db.session.commit()
  for item in cartProducts:
    # print('ENTERING LOOP!')
    # print('ANY CART PRODUCTS HERE', cartProducts)
    if item['productId'] == newItem['productId']:
      item['quantity']+=1
      break



  newTotal = 0

  for item in cartProducts:

    product = Product.query.get(item['productId'])
    product = product.to_dict()
    # if itemExists:
    #   item['quantity']+=1
    # else:item['quantity']==1
    newTotal = newTotal + (product['product_price'] * item['quantity'])
  
  cart.total = newTotal
  db.session.commit()
  cart = cart.to_dict()
  
  return {
    'cart': cart,
    'cartProducts': cartProducts
  }


@cart_routes.route("/update", methods=["PUT"])
def update_cart():  
  data = request.json
  item_id = data['itemId']
  newQuantity = data['quantity']
  cart_id = data['cartId']

  cart = Cart.query.get(cart_id)

  item = CartProduct.query.get(item_id)
  item.quantity = newQuantity
  item = item.to_dict()

  db.session.commit()
  cartObj={}

  items = CartProduct.query.filter(CartProduct.cartId == cart_id).order_by(CartProduct.productId).all()
  cartProducts = [item.to_dict() for item in items]
  
  newTotal = 0
  for item in cartProducts:
    itemExists = db.session.query(db.exists().where(CartProduct.productId==data['itemId'])).first()
    product = Product.query.get(item['productId'])
    product = product.to_dict()
    # if itemExists:
    #   item['quantity']==newQuantity
    newTotal = newTotal + (product['product_price'] * item['quantity'])
  cart.total = newTotal
  db.session.commit()
  cart = cart.to_dict()
  
  return {
    'cart': cart,
    'cartProducts': cartProducts
  }






@cart_routes.route("/<int:product_id>/<int:cart_id>", methods=["DELETE"])
def delete_item(product_id, cart_id):
  cartItem = CartProduct.query.filter(CartProduct.productId == product_id).first()
  db.session.delete(cartItem)
  db.session.commit()

  cartProducts = CartProduct.query.filter(CartProduct.cartId == cart_id)
  cartProducts = [item.to_dict() for item in cartProducts]

  cart = Cart.query.get(cart_id)
  
  newTotal = 0
  for item in cartProducts:
    itemExists = db.session.query(db.exists().where(CartProduct.productId==item['productId'])).first()

    product = Product.query.get(item['productId'])
    product = product.to_dict()
    if itemExists:
      item['quantity']-=1
    newTotal = newTotal + (product['product_price'] * item['quantity'])
  cart.total = newTotal
  db.session.commit()
  cart = cart.to_dict()
  
  return {
    'cart': cart,
    'cartProducts': cartProducts
  }


@cart_routes.route("/purchase/<int:cart_id>", methods=["DELETE"])
def restoreCart(cart_id):
  cart = Cart.query.get(cart_id)
  cartProducts = CartProduct.query.filter(CartProduct.cartId == cart_id).all()
  
  for item in cartProducts:
    product = Product.query.get(item['productId'])
    product = product.to_dict()
    if item['quantity'] > product['quantity']:
      break
    else:
      db.session.delete(item)
  
  cart.total = 0
  db.session.commit()
  
  cart = cart.to_dict()
  
  return {
    'cart': cart,
    'cartProducts': [],
  }

# @cart_routes.route('/', methods=["GET"])
# @login_required
# def get_all_cart():
#     the_cart=Cart.query.filter(Cart.user_id == current_user.get_id())
#     print('THE CART', the_cart)

#     # if not the_cart:
#     #   the_cart = Cart(
#     #     id(len(Cart.query.all()) +1, 
#     #     user_id=user_id, 
#     #     quantity=0,
#     #     total=0
#     #   )
#     #   print('THE CART', the_cart);
#     #   db.session.add(the_cart)
#     #   db.session.commit()

#     #   cartItems = cart_product.query.filter(cart_product.cart_id == cart.id).all()
#     #   cartItems = [product.to_dict() for item in cartItems]

#     #   theTotal=0
#     #   for item in cartItems:
#     #     product=Product.query.get(item['product_id'])
#     #     product=product.to_dict()
#     #     theTotal= theTotal + (product['product_price'] * item['product_quantity'])
#     #   the_cart.total=theTotal
#     #   the_cart=the_cart.to_dict()
#     #   return {
#     #     'the_cart': the_cart,
#     #     'cartItems': cartItems
#       # }
#     all_cart_items = db.session.query(cart_product).join(Cart).filter(Cart.user_id == current_user.get_id())
#     print('ALL_ITEMS', all_cart_items)
#     return {'all_cart_items': [{'cart_id': cart_product.cart_id,'product_id': cart_product.product_id} for cart_product in all_cart_items]}
# # fetch('/api/cart/1', {method: 'Get'}).then(res => res.json()).then(data => console.log(data))



# @cart_routes.route('/new_cart_product', methods=["POST"])
# @login_required
# def add_cart_product():
#   cart_id=request.json['cart_id']
#   new_cart=Cart.query.get(cart_id)
#   product_id=request.json['product_id']
#   new_product=Product.query.get(product_id)
#   new_cart.product.append(new_product)
#   db.session.commit()

#   return {'cart_id':cart_id, 'product_id': product_id}

# # const data = { cart_id: 1, product_id: 2}

# # fetch('/api/cart/new_cart_product', {
# #   method: 'POST',
# #   headers: {
# #     'Content-Type': 'application/json',
# #   },
# #   body: JSON.stringify(data),
# # })
# # .then(response => response.json())
# # .then(data => {
# #   console.log('Success:', data);
# # })
# @cart_routes.route('/', methods=["DELETE"])
# @login_required
# def delete_cart_product():
#   cart_id=request.json['cart_id']
#   delete_cart=Cart.query.get(cart_id)
#   product_id=request.json['product_id']
#   delete_product=Product.query.get(product_id)
#   delete_cart.product.remove(delete_product)
#   db.session.commit()

#   return {'cart_id':cart_id, 'product_id':product_id}

# const data = { cart_id: 1, product_id: 3}

# fetch('/api/cart/', {
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

