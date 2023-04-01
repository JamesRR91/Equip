from app.models import db, Product

def seed_products():
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

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
