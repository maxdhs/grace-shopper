1. Create a .env file in the root directory with the below info replacing any values that have changed:

DB_PASSWORD=postgres
DB_USER=postgres
DB_NAME=grace-shopper

2. Create a local database called "grace-shopper"


3. Tables = beer, user, cart
possible tables to add: beer_carts(reording beer and purchance data(top ten), purchaseInfo(for users coming back to the site)


beer functions: 
beer table: id, name, description, image, brewery, style, abv, price, avgScore
1. createBeer 
2. deleteBeer
3. editBeer
7. getBeerByName
8. getBeerById
9. getBeerByStyle
10. getBeerByBrewery
11. getAllBeers
12. getBeersByUser
13. averageScore * 

user:
user table: id, username(string), password(string), cartCheck(boolean)
1. createUser
2. verifyUser
3. getUserByUsername
4. getUserbyId
6. addCartToUser
7. removeCartFromUser

cart:
cart table: id, userId, isPurchased
1. getCartById
2. getCartByUserId
3. editTotalPrice
5. closeCart
6. getBeersFromCart
7. createCart *

beers_users
tabel: id, userId, beerId, favorite, purchased, score
1. createBeer_users
5. addBeerToUser *
1. scoreBeer *

cart_beers 
table: id, cartId, beerId, quantity, price
1. createCart_beers
5. addBeerToCart *
4. removeBeerFromCart *
