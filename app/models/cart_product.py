from .db import db

class CartProduct(db.Model):
  __tablename__ = 'cart_products'

  id = db.Column(db.Integer, primary_key=True)
  productId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
  cartId = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
  quantity = db.Column(db.Integer, nullable=False)

  product = db.relationship('Product', back_populates='cart_products')
  carts = db.relationship('Cart', back_populates='cart_products')

  def to_dict(self):
    return {
      'id': self.id,
      'productId': self.productId,
      'cartId': self.cartId,
      'quantity': self.quantity,
    }