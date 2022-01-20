from .db import db

class Product(db.Model):
    __tablename__='products'

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(50), nullable=False)
    product_description=db.Column(db.Text, nullable=False)
    product_price=db.Column(db.Float, nullable=False)
    product_quantity=db.Column(db.Integer, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user=db.relationship('User', back_populates='products')

    def to_dict(self):
        return {
            'id':self.id,
            'product_name':self.product_name,
            'product_description':self.product_description,
            'product_price':self.product_price,
            'product_quantity':self.product_quantity,
            'user_id':self.user_id

        }
