from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User, Product

class PostProductForm(FlaskForm):
    product_name = StringField('Name', validators=[DataRequired(), Length(min=4, max=30)])
    product_description=TextAreaField('Description', validators=[DataRequired(), Length(min=10, max=200)])
    product_price=DecimalField('Price', validators=[DataRequired()])
    product_quantity=IntegerField('Quantity', validators=[DataRequired()])
    submit= SubmitField("Add the Product!")
