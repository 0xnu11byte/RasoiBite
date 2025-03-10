# RasoiBite - Online Food Ordering System

## Description
RasoiBite is an online food ordering system designed to provide a seamless experience for users to browse the menu, place orders, manage subscriptions, and track their order history. The system includes user authentication, payment gateway integration, and an intuitive UI for both customers and administrators.

## Features
- **User Authentication:** Sign up, log in, and manage profiles.
- **Menu Browsing:** Explore various food items available for order.
- **Order Management:** Users can place and track their orders.
- **Subscription Service:** Users can subscribe to meal plans.
- **Reviews & Ratings:** Customers can leave reviews and rate food items.
- **Payment Integration:** Razorpay for secure payments.
- **Admin Dashboard:** Manage orders, users, and menu items.

## Tech Stack
### Frontend
- React.js
- Bootstrap
- React Router

### Backend
- Node.js
- Express.js
- MySQL with Sequelize ORM

### Authentication & Security
- JWT-based authentication
- bcrypt for password hashing
- Middleware for protected routes

## Installation
### Prerequisites
- Node.js installed
- MySQL database setup

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/RasoiBite.git
   cd RasoiBite
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=rasoibite
   JWT_SECRET=your_secret_key
   ```

4. Run the database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```

5. Start the backend server:
   ```sh
   npm start
   ```

6. Navigate to the frontend directory and install dependencies:
   ```sh
   cd client
   npm install
   ```

7. Start the frontend:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- **POST /api/auth/signup** - Register a new user
- **POST /api/auth/login** - Authenticate and get a JWT token
- **GET /api/auth/profile** - Get user profile (Requires JWT)

### Orders
- **GET /api/orders** - Fetch user orders (Requires JWT)
- **POST /api/orders** - Place a new order

### Menu
- **GET /api/menu** - Retrieve menu items
- **POST /api/menu** - Add a menu item (Admin only)

## Contributing
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature-branch`)
5. Submit a pull request

## License
This project is licensed under the MIT License.

