from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__='reviews'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_text=db.Column(db.Text, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    product=db.relationship('Product', back_populates='review')

    def to_dict(self):
        return {
            'id':self.id,
            'review_text':self.review_text,
            'user_id':self.user_id,
            'product_id':self.product_id

        }
