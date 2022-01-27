# Equip

## Live Link
https://equip-etsy-clone.herokuapp.com/

## Equip Overview

Equip is my full stack project, which is working as a pseudo Etsy/general e-commerce that deals in the selling of ttrpg goods, a space where you often find many handcrafted works that people love to pay a premium for. Here this site will allow you to sell or buy as needed whether you're a long time dm/player or someone with a particularly creative side. 

For all users of the site(including those not logged in) you will be able to view all the products on offer, as well as visit their particular product page, as well as see/ read all the reviews on that product. I believe this is an essential thing for any user of an ecommerce site to make sure everyone can see, otherwise what incentive would there be to sign up? 

Speaking of those that are signed up and logged in, they will be able to post their own products up for sale, as well as edit their own or delete their own products as needed. Being able to do this fast and on the fly is pretty crucial for any potential seller. 

Another thing currently available is the ability to create, edit and delete their own reviews on the website. Again, not everyone is here to sell, plenty of people are here just to buy and make sure they are getting the best value for their money. This feature ensures they are able to do that, as only they can edit and delete their own reviews.

## Application Architecture

Equip is build utilising a React frontend with a Flask backend, and of course using PostgreSQL as my database. 

### Frontend Tech Used

**React**

Equip is utilizing React for frontend displaying and general capabilities.

**Redux**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Equip utilizes Redux to handle several bits of state, including our products and reviews, as well as users/auth. This is used to make calls to our backend for our database.

### Backend Tech Used

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SA-SQLAlchemy-red)

**Flask**

Flask is perhaps the most intuitive backend I've dealt with thus far, making routing an absolute breeze, as well as simple to understand database querying.

**PostgreSQL and SqlAlchemy**

In concert SQLAlchemy, this was a very simple task to connect my backend routes to my frontend, I'd be hard pressed to want to work with a different backend on my own time.

### Conclusion and Next Steps

For a first run with a flask/react app solo, I think this is a decent start but there is definitely alot more I want to incorporate into future iterations of this project as well as other projects. First I want to hook up my store's cart to properly interact with my products, including tracking quantities in relation to the product page (not adding more than what's currently in quantities for instance).

 As for search, I want to be able to look up based off keywords in the title to start, though eventually I want to try and include description as well, perhaps even a cost filter and add a category filter as well to the database. Another small thing I need to do is add the ability to upload photos to the store page, even if it's just one.
 
 
I think another thing I want to work on is my CSS skills, though I do think I will try and learn some CSS libraries that will help make certain aspects more manageable. This will include adding a carousel to the product cards, I think that would make the site very appealing to look at and use. 


