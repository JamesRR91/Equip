from .db import db
from app.models import User, Product
from .user import User
from sqlalchemy import PrimaryKeyConstraint, func
from .cart_product import CartProduct

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total=db.Column(db.Float)

    user_relationship=db.relationship("User", back_populates="cart_relationship")
    cart_products=db.relationship("CartProduct",  back_populates="carts" )
    # __table_args__ = (
    #     PrimaryKeyConstraint(user_id, product_id, name='user_cart_item_pk'),
    # )

    # product=db.Relationship('Product')    
    # user=db.Relationship('User')

    def to_dict(self):
        return {
            'id':self.id,
            'userId': self.userId,
            'total':self.total
            
        }
