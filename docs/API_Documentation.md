# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
### **1. Register a User**
**Endpoint:**
```
POST /auth/register
```
**Request Body:**
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country"
}
```
**Response:**
```json
{
    "message": "User registered successfully"
}
```

### **2. Login a User**
**Endpoint:**
```
POST /auth/login
```
**Request Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
**Response:**
```json
{
    "token": "your_jwt_token",
    "user": {
        "id": 5,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+1234567890",
        "address": "123 Main St, City, Country",
        "profileImage": "/uploads/default-profiles.png"
    }
}
```

### **3. Get User Profile**
**Endpoint:**
```
GET /auth/profile
```
**Headers:**
```
Authorization: Bearer <your_jwt_token>
```
**Response:**
```json
{
    "id": 5,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "profileImage": "/uploads/default-profiles.png"
}
```

## Users
### **4. Get a User by ID**
**Endpoint:**
```
GET /users?userId=<id>
```
**Headers:**
```
Authorization: Bearer <your_jwt_token>
```
**Response:**
```json
{
    "id": 5,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "profileImage": "/uploads/default-profiles.png"
}
```

## Orders
### **5. Get All Orders (Admin Only)**
**Endpoint:**
```
GET /orders
```
**Headers:**
```
Authorization: Bearer <your_admin_token>
```
**Response:**
```json
[
    {
        "id": 1,
        "user_id": 1,
        "total_price": 570.00,
        "status": "Processing",
        "created_at": "2025-03-05 14:40:08"
    },
    {
        "id": 2,
        "user_id": 2,
        "total_price": 320.00,
        "status": "Pending",
        "created_at": "2025-03-05 14:40:08"
    }
]
```

### **6. Get User's Orders**
**Endpoint:**
```
GET /orders/user
```
**Headers:**
```
Authorization: Bearer <your_jwt_token>
```
**Response:**
```json
[
    {
        "id": 5,
        "user_id": 5,
        "total_price": 150.00,
        "status": "Completed",
        "created_at": "2025-03-05 14:40:08"
    }
]
```

### **7. Create an Order**
**Endpoint:**
```
POST /orders
```
**Headers:**
```
Authorization: Bearer <your_jwt_token>
```
**Request Body:**
```json
{
    "total_price": 500.00
}
```
**Response:**
```json
{
    "message": "Order placed successfully",
    "order": {
        "id": 6,
        "user_id": 5,
        "total_price": 500.00,
        "status": "Pending",
        "created_at": "2025-03-05 14:40:08"
    }
}
```

### **8. Update Order Status (Admin Only)**
**Endpoint:**
```
PATCH /orders/:id
```
**Headers:**
```
Authorization: Bearer <your_admin_token>
```
**Request Body:**
```json
{
    "status": "Completed"
}
```
**Response:**
```json
{
    "message": "Order status updated successfully"
}
```

## Error Handling
### Common Error Responses
**Unauthorized Request:**
```json
{
    "message": "Access Denied"
}
```

**Invalid Token:**
```json
{
    "message": "Invalid Token"
}
```

**Not Found:**
```json
{
    "message": "Resource not found"
}
```

---
### Notes
- **All protected routes require a valid JWT token in the `Authorization` header.**
- **Admin-only routes require an admin token.**
- **By default, if a user has no `profileImage`, `/uploads/default-profiles.png` is used.**

