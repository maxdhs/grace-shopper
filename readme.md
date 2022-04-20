# Get Started

1. Create a .env file in the root directory with the below info replacing any values that have changed:

- DB_PASSWORD=postgres
- DB_USER=postgres
- DB_NAME=grace-shopper

2. Create a local database called "grace-shopper"

# Proposed Tables:
  ## users
  Columns:
  - id
  - email
  - password
  
  ## meat
  Columns:
  - id
  - type (ex.:Beef, Chicken, Pork, etc...)
  - style (ex.: raw, marinated, smoked, etc...)
  - flavor (ex.: terryaki, spicy, none, etc...)
  
  ## orders
  Columns:
  - id
  - user_id
  - fulfilled (ex.: true, false)

  ## user_meats (Junction table that will act as a cart for a signed in user)
  Columns:
  - id
  - meat_id
  - user_id
