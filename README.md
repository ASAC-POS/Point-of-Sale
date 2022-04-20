# Point-of-Sale

**by debuggers team** :

- Mohammad Salameh
- Jalal Hasan
- Leen Ahmad
- Neveen Aburomman
- Manal Albahar

## Stories

- Register a store

  - as a user I would like to register my store (this is process is implemented by the user sending a form containing the store name, the store owner email address, the store location and store type of business )
  - As software admin, we start by creating a store and adding the store owner as an admin to the recently created store, hashing passwords, adding an entry to user tables related to the specific store using the store ID.
  - check if the entry was added

- adding employees

  - as a user I would like to add employees with their respective roles
  - check permession, signup endpoit, adding an entry to user tables.
  - check if the entry was added successfully, check if the endpoint is working correctly (CRUD)

- inventory management

  - I would like to check and manage my inventory
  - adding new products to the stores table, checking quantitiy, price editing
  - check if the entry was added successfully, check if the endpoint is working correctly (CRUD)

- getting data

  - as a user I would like to see my products with their data (price, description)
  - check permession, check token, /product endpoint
  - check if the output is as expected.

- Selling

  - as a user I would like to perform a selling process using the POS
  - adding products to cart with specific quantitiy, calculate total price, reduce the quantity from the database
  - check if the pos is working correctly

- daily reports
  - as a user I would like to get a report on my daily sales
  - get data from receipts table when the date is equal to today's.
  - check if the daily report is working correctly.

## Wireframe

- home page

  - ![hompage](./assets/pointOfSaleimages/homepage.png)
  - API paths used: /register, method: post

- Sign in page

  - ![sigin in](./assets/pointOfSaleimages/signinpage.png)
  - API paths used: /signin, method: post

- store page

  - ![store home page admin](./assets/pointOfSaleimages/storeprofileadmin.png)
  - API paths used: /store/id, method: post

- store page cashier 

  - ![cashire home page](./assets/pointOfSaleimages/storeprofilecashier.png)
  - API paths used: /store/id, method: post

- store page inventory  

  - ![cashire home page](./assets/pointOfSaleimages/storeprofileinventory.png)
  - API paths used: /store/id, method: post

- product page for admin

  - ![product](./assets/pointOfSaleimages/productpage.png)
  - API paths used:
    - /products, method: get
    - /product, method: post
    - /product/:id, methods: put, delete, get

- POS for cashier (products page)
  - ![point of sale page](./assets/pointOfSaleimages/pointofsalepage.png)
  - API paths used:
    - /products, method: get
    - /product/:id, method: get
    - /receipt, method: post

- Users page

  - ![users](./assets/pointOfSaleimages/userpage.png)
  - API paths used:
    - /user, method: post
    - /storeEmps, method: get
    - /users, method: get
    - /user/:id, methods: put, delete, get

- Receipts page

  - ![receipts](./assets/pointOfSaleimages/receiptspage.png)
  - API paths used:
    - /getReceipt, method: get
    - /getReceipt/:id , method: get
    - /receipt/:id, method: delete, put, get



## Database

- model:

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

  | ID (PK) serial | total integer | product ARRAY | userID (FK) string | paymentMethod string | discount | totalAfterDicount |
  | -------------- | ------------- | ------------- | ------------------ | -------------------- | -------- | ----------------- |

## routes

- **/register**

  - method: post
  - body :

  ```json
  {
    "storeName": "example-store",
    "email": "store@example.com",
    "location": "amman",
    "businessType": "retail",
    "username": "admin",
    "password": "@dmiN123"
  }
  ```

  - response:

  ```json
  {
    "actions": [
      "read",
      "create",
      "update",
      "delete",
      "add",
      "remove",
      "edit",
      "sell"
    ],
    "id": 1,
    "username": "admin",
    "password": "$2b$05$Acy2f/RAa1w02H6HckV/UeGFc3uLCZ4tKdCQaGTRDH4GY3YX2NOVu",
    "role": "admin",
    "storeID": 1,
    "updatedAt": "2022-04-20T17:38:50.241Z",
    "createdAt": "2022-04-20T17:38:50.241Z"
  }
  ```

- **/singin**

  - method : post
  - headers:
    `basic auth: username::password`
  - response:

  ```json
  {
    "actions": [
      "read",
      "create",
      "update",
      "delete",
      "add",
      "remove",
      "edit",
      "sell"
    ],
    "id": 1,
    "username": "admin",
    "password": "$2b$05$Acy2f/RAa1w02H6HckV/UeGFc3uLCZ4tKdCQaGTRDH4GY3YX2NOVu",
    "role": "admin",
    "storeID": 1,
    "createdAt": "2022-04-20T17:38:50.241Z",
    "updatedAt": "2022-04-20T17:38:50.241Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjUwNDc2NTQ0fQ.oUMdaKsnWs0gN63vgy_TJNiBoukQVKT7CHPXM2OPjP4"
  }
  ```

  - cookies.si : `s%3AhZHEDmOmRPLIytv54Cydm1S1yRRwojhG.lkOaeBuxpXhkNrT40Q9eUI7M1bO0vNxeExloazA%2FdtI`

- **/user**

  - method : post
  - cookies.si : `s%3AhZHEDmOmRPLIytv54Cydm1S1yRRwojhG.lkOaeBuxpXhkNrT40Q9eUI7M1bO0vNxeExloazA%2FdtI`
  - body:

  ```json
  {
    "username": "cashier",
    "password": "c@sHier123",
    "role": "cashier"
  }
  ```

  - response:

  ```json
  {
    "actions": ["read", "update", "sell"],
    "id": 2,
    "username": "cashierzara",
    "password": "$2b$05$UG4FcjC1kNZw51gJIzW0Lu2uJ5bXdURG34xVFnnNO.fNirh40hfiC",
    "role": "cashier",
    "storeID": 1,
    "updatedAt": "2022-04-20T17:54:15.651Z",
    "createdAt": "2022-04-20T17:54:15.651Z"
  }
  ```

- **/user/:id**

  - method: get

    - cookies.si : `s%3AhZHEDmOmRPLIytv54Cydm1S1yRRwojhG.lkOaeBuxpXhkNrT40Q9eUI7M1bO0vNxeExloazA%2FdtI`
    - response:

    ```json
    {
      "actions": [
        "read",
        "create",
        "update",
        "delete",
        "add",
        "remove",
        "edit",
        "sell"
      ],
      "id": 1,
      "username": "admin",
      "password": "$2b$05$Acy2f/RAa1w02H6HckV/UeGFc3uLCZ4tKdCQaGTRDH4GY3YX2NOVu",
      "role": "admin",
      "storeID": 1,
      "createdAt": "2022-04-20T17:38:50.241Z",
      "updatedAt": "2022-04-20T17:38:50.241Z"
    }
    ```

  - method: put

    - body:

    ```json
    {
      "username": "cashier",
      "password": "c@sHier123",
      "role": "cashier"
    }
    ```

    - response:

    ```json
    {
      "updatedUser": {
        "actions": ["read", "update", "sell"],
        "id": 2,
        "username": "cashierzara",
        "password": "$2b$05$R2iqWq8QwIFseP/OUvp5MeivX0KyCJnBvRwZt5vYeqCT/er5yQU4q",
        "role": "cashier",
        "storeID": 1,
        "createdAt": "2022-04-20T17:54:15.651Z",
        "updatedAt": "2022-04-20T18:01:14.231Z"
      },
      "message": "user with id: 2 was updated successfully"
    }
    ```

  - method: delete

    - response:

    ```json
    {
      "message": "user with id: 2 was deleted successfully"
    }
    ```

- **/users**

  - method: get
  - response:

  ```json
  [
    {
      "actions": [
        "read",
        "create",
        "update",
        "delete",
        "add",
        "remove",
        "edit",
        "sell"
      ],
      "id": 1,
      "username": "admin",
      "password": "$2b$05$Acy2f/RAa1w02H6HckV/UeGFc3uLCZ4tKdCQaGTRDH4GY3YX2NOVu",
      "role": "admin",
      "storeID": 1,
      "createdAt": "2022-04-20T17:38:50.241Z",
      "updatedAt": "2022-04-20T17:38:50.241Z"
    },
    {
      "actions": ["read", "update", "sell"],
      "id": 3,
      "username": "cashierzara",
      "password": "$2b$05$vG5y2w92iIRJRWK/OCRjCOZ9CDF17AK0VmaTOI4El8B.9bm/T.NnC",
      "role": "cashier",
      "storeID": 1,
      "createdAt": "2022-04-20T18:10:57.268Z",
      "updatedAt": "2022-04-20T18:10:57.268Z"
    }
  ]
  ```

- **/product**

  - method: post
  - body:

  ```json
  {
    "productName": "t-shirt blue",
    "description": "a blue t-shir with logo",
    "quantity": "20",
    "price": "13",
    "minQuantity": "10"
  }
  ```

  - response:

  ```json
  {
    "id": 1,
    "productName": "t-shirt blue",
    "description": "a blue t-shir with logo",
    "quantity": 20,
    "price": 13,
    "minQuantity": 10,
    "storeID": 1,
    "updatedAt": "2022-04-20T18:14:51.062Z",
    "createdAt": "2022-04-20T18:14:51.062Z"
  }
  ```

- **/products**

  - method: get
  - body:

  ```json
  [
    {
      "id": 1,
      "productName": "t-shirt blue",
      "quantity": 20,
      "description": "a blue t-shir with logo",
      "price": 13,
      "minQuantity": 10,
      "storeID": 1,
      "createdAt": "2022-04-20T18:14:51.062Z",
      "updatedAt": "2022-04-20T18:14:51.062Z"
    },
    {
      "id": 2,
      "productName": "shoes black",
      "quantity": 20,
      "description": "black shoes goes with everything",
      "price": 13,
      "minQuantity": 10,
      "storeID": 1,
      "createdAt": "2022-04-20T18:23:37.702Z",
      "updatedAt": "2022-04-20T18:23:37.702Z"
    }
  ]
  ```

- **/product/:id**

  - method: put

    - body:

    ```json
    {
      "productName": "shoes black",
      "description": "black shoes goes with everything",
      "quantity": "15",
      "price": "13",
      "minQuantity": "10"
    }
    ```

    - response:

    ```json
    {
      "product": {
        "id": 1,
        "productName": "shoes black",
        "quantity": 15,
        "description": "black shoes goes with everything",
        "price": 13,
        "minQuantity": 10,
        "storeID": 1,
        "createdAt": "2022-04-20T18:14:51.062Z",
        "updatedAt": "2022-04-20T18:26:00.792Z"
      },
      "message": "product with product id: 1 was updated successfully"
    }
    ```

  - method: get

    - body:

    ```json
    {
      "id": 2,
      "productName": "shoes black",
      "quantity": 20,
      "description": "black shoes goes with everything",
      "price": 13,
      "minQuantity": 10,
      "storeID": 1,
      "createdAt": "2022-04-20T18:23:37.702Z",
      "updatedAt": "2022-04-20T18:23:37.702Z"
    }
    ```

  - method: delete

    - body:

    ```json
    {
      "message": "product with id: 2 was deleted successfully"
    }
    ```

- **/receipt**

  - method: post
  - body:

  ```json
  {
    "product": [
      { "productName": "shoes black", "quantity": "2", "productID": "1" }
    ],
    "userID": "3",
    "PaymentMethod": "cash",
    "total": "30",
    "discount": "50"
  }
  ```

  - response:

  ```json
  {
    "id": 1,
    "product": [
      {
        "productName": "shoes black",
        "quantity": "2",
        "productID": "1"
      }
    ],
    "userID": 3,
    "PaymentMethod": "cash",
    "total": 30,
    "discount": 50,
    "totalAfterDiscount": 15,
    "storeID": 1,
    "updatedAt": "2022-04-20T18:46:58.012Z",
    "createdAt": "2022-04-20T18:46:58.012Z"
  }
  ```

- **/receipt/:id**

  - method: put

    - body:

    ```json
    {
      "product": [
        { "productName": "shoes black", "quantity": "2", "productID": "1" }
      ],
      "userID": "1",
      "PaymentMethod": "cash",
      "total": "30",
      "discount": "50"
    }
    ```

    - response:

    ```json
    {
      "receipt": {
        "id": 1,
        "product": [
          {
            "productName": "shoes black",
            "quantity": "2",
            "productID": "1"
          }
        ],
        "userID": 1,
        "storeID": 1,
        "PaymentMethod": "cash",
        "total": 30,
        "discount": 50,
        "totalAfterDiscount": 15,
        "createdAt": "2022-04-20T18:46:58.012Z",
        "updatedAt": "2022-04-20T18:51:04.854Z"
      },
      "message": "receipt with receipt id: 1 was updated successfully"
    }
    ```

  - method: delete

    - response:

    ```json
    {
      "message": "receipt with id: 2 was deleted successfully"
    }
    ```

- **/getReceipt**

  - method: get
  - response:

  ```json
  [
    {
      "actions": [
        "read",
        "create",
        "update",
        "delete",
        "add",
        "remove",
        "edit",
        "sell"
      ],
      "id": 1,
      "username": "admin",
      "password": "$2b$05$Acy2f/RAa1w02H6HckV/UeGFc3uLCZ4tKdCQaGTRDH4GY3YX2NOVu",
      "role": "admin",
      "storeID": 1,
      "createdAt": "2022-04-20T17:38:50.241Z",
      "updatedAt": "2022-04-20T17:38:50.241Z",
      "receipts": [
        {
          "id": 1,
          "product": [
            {
              "productName": "shoes black",
              "quantity": "2",
              "productID": "1"
            }
          ],
          "userID": 1,
          "storeID": 1,
          "PaymentMethod": "cash",
          "total": 30,
          "discount": 50,
          "totalAfterDiscount": 15,
          "createdAt": "2022-04-20T18:46:58.012Z",
          "updatedAt": "2022-04-20T18:51:04.854Z"
        },
        {
          "id": 3,
          "product": [
            {
              "productName": "shoes black",
              "quantity": "3",
              "productID": "1"
            }
          ],
          "userID": 1,
          "storeID": 1,
          "PaymentMethod": "cash",
          "total": 45,
          "discount": 50,
          "totalAfterDiscount": 22.5,
          "createdAt": "2022-04-20T18:54:40.373Z",
          "updatedAt": "2022-04-20T18:54:40.373Z"
        }
      ]
    },
    {
      "actions": ["read", "update", "sell"],
      "id": 3,
      "username": "cashierzara",
      "password": "$2b$05$vG5y2w92iIRJRWK/OCRjCOZ9CDF17AK0VmaTOI4El8B.9bm/T.NnC",
      "role": "cashier",
      "storeID": 1,
      "createdAt": "2022-04-20T18:10:57.268Z",
      "updatedAt": "2022-04-20T18:10:57.268Z",
      "receipts": [
        {
          "id": 4,
          "product": [
            {
              "productName": "shoes black",
              "quantity": "1",
              "productID": "1"
            }
          ],
          "userID": 3,
          "storeID": 1,
          "PaymentMethod": "cash",
          "total": 15,
          "discount": 50,
          "totalAfterDiscount": 7.5,
          "createdAt": "2022-04-20T19:01:43.792Z",
          "updatedAt": "2022-04-20T19:01:43.792Z"
        }
      ]
    }
  ]
  ```

- **getReceipt/:id**

  - method : get
  - response:

  ```json
  {
    "actions": ["read", "update", "sell"],
    "id": 3,
    "username": "cashierzara",
    "password": "$2b$05$vG5y2w92iIRJRWK/OCRjCOZ9CDF17AK0VmaTOI4El8B.9bm/T.NnC",
    "role": "cashier",
    "storeID": 1,
    "createdAt": "2022-04-20T18:10:57.268Z",
    "updatedAt": "2022-04-20T18:10:57.268Z",
    "receipts": [
      {
        "id": 4,
        "product": [
          {
            "productName": "shoes black",
            "quantity": "1",
            "productID": "1"
          }
        ],
        "userID": 3,
        "storeID": 1,
        "PaymentMethod": "cash",
        "total": 15,
        "discount": 50,
        "totalAfterDiscount": 7.5,
        "createdAt": "2022-04-20T19:01:43.792Z",
        "updatedAt": "2022-04-20T19:01:43.792Z"
      }
    ]
  }
  ```

- **/store/:id**

  - method: put

    - body:

    ```json
    {
      "storename": "zara",
      "email": "zara@example.com",
      "location": "amman",
      "businessType": "retail"
    }
    ```

    - response :

    ```json
    {
      "updatedStore": {
        "id": 1,
        "storename": "zara",
        "email": "zara@example.com",
        "location": "amman",
        "businessType": "retail",
        "createdAt": "2022-04-20T17:38:50.209Z",
        "updatedAt": "2022-04-20T19:13:04.525Z"
      },
      "message": "store with id: 1 was updated successfully"
    }
    ```

  - method: get

    - response:

    ```json
    {
      "id": 1,
      "storename": "zara",
      "email": "zara@example.com",
      "location": "amman",
      "businessType": "retail",
      "createdAt": "2022-04-20T17:38:50.209Z",
      "updatedAt": "2022-04-20T19:13:04.525Z"
    }
    ```

  - method: delete

    - response :

    ```json
    {
      "message": "store with id: 2 was deleted successfully"
    }
    ```

- **/storeReceipts**

  - method: get
  - response:

  ```json
  [
    {
      "id": 1,
      "storename": "zara",
      "email": "zara@example.com",
      "location": "amman",
      "businessType": "retail",
      "createdAt": "2022-04-20T17:38:50.209Z",
      "updatedAt": "2022-04-20T19:13:04.525Z",
      "receipts": [
        {
          "id": 1,
          "product": [
            {
              "productName": "shoes black",
              "quantity": "2",
              "productID": "1"
            }
          ],
          "userID": 1,
          "storeID": 1,
          "PaymentMethod": "cash",
          "total": 30,
          "discount": 50,
          "totalAfterDiscount": 15,
          "createdAt": "2022-04-20T18:46:58.012Z",
          "updatedAt": "2022-04-20T18:51:04.854Z"
        },
        {
          "id": 3,
          "product": [
            {
              "productName": "shoes black",
              "quantity": "3",
              "productID": "1"
            }
          ],
          "userID": 1,
          "storeID": 1,
          "PaymentMethod": "cash",
          "total": 45,
          "discount": 50,
          "totalAfterDiscount": 22.5,
          "createdAt": "2022-04-20T18:54:40.373Z",
          "updatedAt": "2022-04-20T18:54:40.373Z"
        },
        {
          "id": 4,
          "product": [
            {
              "productName": "shoes black",
              "quantity": "1",
              "productID": "1"
            }
          ],
          "userID": 3,
          "storeID": 1,
          "PaymentMethod": "cash",
          "total": 15,
          "discount": 50,
          "totalAfterDiscount": 7.5,
          "createdAt": "2022-04-20T19:01:43.792Z",
          "updatedAt": "2022-04-20T19:01:43.792Z"
        }
      ]
    }
  ]
  ```

- **/storeEmps**

  - method: get
  - response

  ```json
  [
    {
      "id": 1,
      "storename": "zara",
      "email": "zara@example.com",
      "location": "amman",
      "businessType": "retail",
      "createdAt": "2022-04-20T17:38:50.209Z",
      "updatedAt": "2022-04-20T19:13:04.525Z",
      "users": [
        {
          "actions": [
            "read",
            "create",
            "update",
            "delete",
            "add",
            "remove",
            "edit",
            "sell"
          ],
          "id": 1,
          "username": "admin",
          "password": "$2b$05$Acy2f/RAa1w02H6HckV/UeGFc3uLCZ4tKdCQaGTRDH4GY3YX2NOVu",
          "role": "admin",
          "storeID": 1,
          "createdAt": "2022-04-20T17:38:50.241Z",
          "updatedAt": "2022-04-20T17:38:50.241Z"
        },
        {
          "actions": ["read", "update", "sell"],
          "id": 3,
          "username": "cashierzara",
          "password": "$2b$05$vG5y2w92iIRJRWK/OCRjCOZ9CDF17AK0VmaTOI4El8B.9bm/T.NnC",
          "role": "cashier",
          "storeID": 1,
          "createdAt": "2022-04-20T18:10:57.268Z",
          "updatedAt": "2022-04-20T18:10:57.268Z"
        }
      ]
    }
  ]
  ```

- **/popup**
  - method: get
  - response:
    - user sing in: `user name : cashierzara has sign in`
    - new user created: `New user was added ==> username: cashierzara6, role: cashier, ID: 9`
