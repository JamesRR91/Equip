from app.models import db, Review

def seed_reviews():
    testReview= Review(review_text='This is a test review', user_id=1, product_id=1)
    diceReview= Review(review_text='These were great but a little pricy for the quality', user_id=1, product_id=2)
    mapReview= Review(review_text='I really liked the map but not the easiest to clean', user_id=1, product_id=3)

    db.session.add(testReview)
    db.session.add(diceReview)
    db.session.add(mapReview)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
