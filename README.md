# Point-of-Sale

## Wireframe

![hompage](./assets/pointOfSaleImages/homepage.png)

![sigin in](./assets//pointOfSaleImages/signinpage.png)

![store home page](./assets/pointOfSaleImages/storeprofileadmin.png)

![product](./assets/pointOfSaleImages/productpage.png)

![users](./assets/pointOfSaleImages/userpage.png)

![receipts](./assets/pointOfSaleImages/receiptspage%20.png)

![point of sale page](./assets/pointOfSaleImages/pointofsalepage.png)


## Database

**Data Model**
![data model](./assets/DBRD.png)

- users:

  | ID (PK) serial | username string | password(hashed) | role string | actions Virtual | Token Virtual | storeID (FK) integer |
  | -------------- | --------------- | ---------------- | ----------- | --------------- | ------------- | -------------------- |

- stores:

  | ID (PK) serial | storename sting | email string | location string | business type string |
  | -------------- | --------------- | ------------ | --------------- | -------------------- |

- products:

  | ID (PK) serial | productName sting | quantity integer | price integer | minQuantity integer | storeID (FK) integer |
  | -------------- | ----------------- | ---------------- | ------------- | ------------------- | -------------------- |

- receipts:

  | ID (PK) serial | totalPrice integer | quantityNumber integer | userID (FK) string | paymentDate (date) |
  | -------------- | ------------------ | ---------------------- | ------------------ | ------------------ |

## Stories

1. Register a store

- as a user I would like to register my store (this is process is implemented by the user sending a form containing the store name, the store owner email address, the store location and store type of business )
- As software admin, we start by creating a store and adding the store owner as an admin to the recently created store, hashing passwords, adding an entry to user tables related to the specific store using the store ID.
- check if the entry was added

2. adding employees

- as a user I would like to add employees with their respective roles
- check permession, signup endpoit, adding an entry to user tables.
- check if the entry was added successfully, check if the endpoint is working correctly (CRUD)

3. inventory management

- I would like to check and manage my inventory
- adding new products to the stores table, checking quantitiy, price editing
- check if the entry was added successfully, check if the endpoint is working correctly (CRUD)

4. getting data

- as a user I would like to see my products with their data (price, description)
- check permession, check token, /product endpoint
- check if the output is as expected.

5. Selling

- as a user I would like to perform a selling process using the POS
- adding products to cart with specific quantitiy, calculate total price, reduce the quantity from the database
- check if the pos is working correctly

6. daily reports

- as a user I would like to get a report on my daily sales
- get data from receipts table when the date is equal to today's.
- check if the daily report is working correctly.
