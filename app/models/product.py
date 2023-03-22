from .db import db,  environment, SCHEMA, add_prefix_for_prod
from .cart_product import CartProduct

class Product(db.Model):
    __tablename__='products'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(50), nullable=False)
    product_description=db.Column(db.Text, nullable=False)
    product_price=db.Column(db.Float, nullable=False)
    product_quantity=db.Column(db.Integer, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user=db.relationship('User', back_populates='products')
    review=db.relationship('Review', back_populates='product', cascade='all, delete')
    cart_products=db.relationship("CartProduct", back_populates="product")

    def to_dict(self):
        return {
            'id':self.id,
            'product_name':self.product_name,
            'product_description':self.product_description,
            'product_price':self.product_price,
            'product_quantity':self.product_quantity,
            'user_id':self.user_id

        }
