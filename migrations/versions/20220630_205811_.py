"""empty message

Revision ID: d899bc7de5bd
Revises: 013f38e845cf
Create Date: 2022-06-30 20:58:11.833701

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd899bc7de5bd'
down_revision = '013f38e845cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cart_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('cartId', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cartId'], ['carts.id'], ),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('cart_product')
    op.add_column('carts', sa.Column('userId', sa.Integer(), nullable=False))
    op.drop_constraint('carts_user_id_fkey', 'carts', type_='foreignkey')
    op.create_foreign_key(None, 'carts', 'users', ['userId'], ['id'])
    op.drop_column('carts', 'quantity')
    op.drop_column('carts', 'user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('carts', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('carts', sa.Column('quantity', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'carts', type_='foreignkey')
    op.create_foreign_key('carts_user_id_fkey', 'carts', 'users', ['user_id'], ['id'])
    op.drop_column('carts', 'userId')
    op.create_table('cart_product',
    sa.Column('cart_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], name='cart_product_cart_id_fkey'),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name='cart_product_product_id_fkey'),
    sa.PrimaryKeyConstraint('cart_id', 'product_id', name='cart_product_pkey')
    )
    op.drop_table('cart_products')
    # ### end Alembic commands ###
