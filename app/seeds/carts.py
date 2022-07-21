from app.models import db, Cart

def seed_carts():
    test_cart=Cart(
       userId=1, quantity=1, total=29.99)

    db.session.add(test_cart)

    db.session.commit()

def undo_carts():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()