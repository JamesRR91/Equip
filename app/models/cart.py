# from .db import db
# from app.models import User, Product
# from .user import User
# from sqlalchemy import PrimaryKeyConstraint

# class Cart(db.Model):
#     __tablename__ = 'carts'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
#     product_id = db.Column(db.Integer, db.ForeignKey(Product.id), nullable=False)
#     quantity = db.Column(db.Integer)

#     __table_args__ = (
#         PrimaryKeyConstraint(user_id, product_id, name='user_cart_item_pk'),
#     )

#     product=db.Relationship('Product')    

#     def to_dict(self):
#         return {
#             'product':self.product.to_dict(),
#             'user_id': self.user_id,
#             'product_id': self.product_id,
#             'quantity': self.quantity
#         }
