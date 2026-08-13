# E-Commerce REST API

A backend e-commerce REST API built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project was built to practice backend architecture, authentication, authorization, resource ownership, database relationships, and e-commerce business logic.

## Features

### Authentication & Users

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization
- Admin and user roles
- Protected routes
- Admin-only operations

### Products

- View all products
- View a single product
- Admin can create products
- Admin can update products
- Admin can delete products
- Product categories
- Product stock management
- Product price management

### Carts

- Users can create multiple carts
- Users can view their own carts
- Users can retrieve an individual cart
- Add products to a cart
- Update cart item quantities
- Remove products from carts
- Delete carts
- Stock reservation when products are added to carts
- Stock restoration when cart items/carts are removed

### Orders

- Create orders from carts
- View user's orders
- View individual orders
- Delete individual orders
- Delete user's orders
- Admin can view all orders
- Admin can update order status
- Order stores product information and price at the time of purchase
- Automatic order total calculation

### Security

- Passwords are hashed using bcrypt
- JWT authentication
- Role-based authorization
- Users can only access their own carts and orders
- Admin-only product and order management
- Environment variables for sensitive configuration
- Centralized error handling

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcrypt**
- **dotenv**

---

## Project Structure

```text
ecommerce/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── cartController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
│
├── middlewares/
│   ├── authentication.js
│   ├── authorization.js
│   └── errorhandler.js
│
├── models/
│   ├── cartmodel.js
│   ├── ordermodel.js
│   ├── productmodel.js
│   └── usermodel.js
│
├── routes/
│   ├── cartroutes.js
│   ├── orderroutes.js
│   ├── productroutes.js
│   └── userroutes.js
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── package-lock.json
