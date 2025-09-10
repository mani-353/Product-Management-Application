# Product Management System

A full-stack **Product Management Dashboard** built with **React (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB Atlas (Database)**.  
This project allows users to manage products with **CRUD operations**, search, sort, and a clean responsive UI.

---

##  Features

-  Display all products in a grid layout
-  Add new products with **form validation**
-  Edit existing products
- Delete products (with confirmation prompt)
- Search products by name
- Sort products by price (low → high / high → low)
- Responsive & user-friendly UI
- Full stack integration with MongoDB Atlas

---


##  Tech Stack

- **Frontend:** React, Hooks (`useState`, `useEffect`), CSS/Tailwind
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud MongoDB)
- **ORM:** Mongoose

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/product-management-system.git
cd product-management-system
```
### 2. Setup MongoDB Atlas

1. Sign in to Atlas: https://cloud.mongodb.com
  
2. Create a database named: productdb and Collection: products
   
3. Create a database user with username & password.

4. Get the MongoDB connection string (URI):
```bash
mongodb+srv://<username>:<password>@cluster0.mongodb.net/productdb
```
### 3. Backend Setup
```bash
cd backend
npm install
```
create .env file 
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/productdb
PORT=5000
```
Run the backend 
```bash
node server.js
```
server runs at port 5000
### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs at 5173 port

---
## Author
Developed by Veera Manikanta Nandikolla
