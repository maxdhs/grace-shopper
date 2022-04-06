1. Create a .env file in the root directory with the below info replacing any values that have changed:

DB_PASSWORD=postgres
DB_USER=postgres
DB_NAME=grace-shopper

2.  Create a local database called "grace-shopper"
    -DATABASE ADAPTERS FUNCTIONS
    USER TABLE: - createUser - getUserById - getUserByUsername

    PRODUCT TABLE: - getAllProdcuts - getProductById - getProductsByBrand - saveProductsInCart

    CATEGORIES: - createCategory - getAllCategories -

    PRODUCT CATEGORIES: -

    CART: - addProductToCart - removeProductFromCart - updateQuantity

        NOT A TABLE:
        ADMIN ADAPTERS:
            - createProduct
            - deleteProduct
            - updateProduct
            - getUsers
