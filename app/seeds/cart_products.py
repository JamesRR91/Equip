from app.models import db, cart_product, Cart, Product, CartProduct
from app.models.db import environment, SCHEMA

def seed_cart_products():
    test= Product(
        product_name='Test Product', product_description='This is a test description', product_price=29.99, product_quantity=9, user_id=1)
    dice= Product(
        product_name='Set of Dice', product_description='A set of dice to get you started on your TTRPG journey', product_price=9.99, product_quantity=15, user_id=1
    )
    map= Product(
        product_name='Battle Map', product_description='Use and draw on for any and all combat/other needs for your adventuring', product_price=39.99, product_quantity=4, user_id=1
    )

    db.session.add(test)
    db.session.add(dice)
    db.session.add(map)

    test_cart=Cart(
       userId=1
       )
    cart_2=Cart(
        userId=2
    )

    db.session.add(test_cart)
    db.session.add(cart_2)

    test_cart_product=CartProduct(
        id=1,
        productId=3,
        cartId=1,
        quantity=1
    )

    db.session.add(test_cart_product)
    # test_cart.product.append(test)
    # cart_2.product.append(dice)
    # cart_2.product.append(map)

    db.session.commit()

def undo_cart_products():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")
        db.session.execute("DELETE FROM products")
        db.session.execute("DELETE FROM cart_products")

    db.session.commit()
