from .db import db

class Review(db.Model):
    __tablename__='reviews'

    id = db.Column(db.Integer, primary_key=True)
    review_text=db.Column(db.Text, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id=db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    def to_dict(self):
        return {
            'id':self.id,
            'review_text':self.review_text,
            'user_id':self.user_id,
            'product_id':self.product_id

        }
