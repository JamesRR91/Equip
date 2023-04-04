from flask.cli import AppGroup
from .users import seed_users, undo_users
from .cart_products import seed_cart_products, undo_cart_products
from .reviews import seed_reviews, undo_reviews
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_cart_products()
        undo_reviews()
    seed_users()
    seed_cart_products()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_cart_products()
    undo_reviews()
    # Add other undo functions here
