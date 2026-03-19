# 🍔 Food Order App (MERN Stack)

A full-featured Food Ordering Application built using the MERN stack with real-time order tracking  integration.

---

## 🚀 Features

### 👤 User Features
- Browse Food Menu (Horizontal Scroll UI)
- Add to Cart
- Checkout Process
- Order Success Page
- Live Order Tracking (Socket.IO)

### 🛠️ Admin Features
- Manage Food Items (Add/Edit/Delete)
- Manage Orders
- Update Order Status in Real-Time

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose


### Real-Time
- Socket.IO

### Payment Gateway
- Razorpay

---



## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Jignasa10/Food-Order.git
cd food-order-app
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in server:
```
PORT=5000
MONGO_URI=your_mongodb_connection
```

Run backend:
```bash
npm run dev
```

---

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔑 API Endpoints (Sample)



### Food
- GET `/api/menu`
- POST `/api/menu` (Admin)


### Orders
- POST `/api/orders`
- GET `/api/orders`
- GET `/api/orders`
- PATCH `/api/orders/:id/status`


---

## 🔌 Socket.IO Events

- `orderPlaced`
- `orderUpdated`

---


## 🖼️ Pages Included

- Home Page (Menu Display)
- Cart Page
- Checkout Page
- Order Success Page
- Live Order Tracking Page

---

## 📸 Future Improvements
- Order by user
- Add Reviews & Ratings  
- Multi-language Support  
- Push Notifications  
- Admin Dashboard Analytics  

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## ⭐ Support

If you like this project, give it a star ⭐ on GitHub!
