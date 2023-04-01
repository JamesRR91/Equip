from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product 

def valid_product(form, field):
    product_id=field.data
    product=Product.query.get(product_id)
    if not product:
        raise ValidationError('Product not found')

def correct_amount(form, field):
    amount=field.data
    if amount <= 0:
        raise ValidationError('Must have 1 or more')
    if amount > Product.product_quantity:
        raise ValidationError('Cannot buy more than available amount')

class CartForm(FlaskForm):
    productId=IntegerField(validators=[DataRequired(), valid_product])
    productQuantity=IntegerField(validators=[DataRequired(), correct_amount])