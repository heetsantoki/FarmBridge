# 🌱 FarmBridge

FarmBridge is an end-to-end web-based platform that bridges the gap between farmers, buyers, and agriculture experts. The system aims to empower the agricultural ecosystem by providing seamless access to product management, expert consultations, and efficient supply chain interactions.

## 🚀 Features

### 👩‍🌾 For Farmers
- Add and manage agricultural products
- Track inventory and sales
- Receive crop and weather-related tips
- Connect with buyers and agronomists

### 🛒 For Buyers
- Explore available agricultural products
- View farmer profiles and product quality
- Place orders and manage transactions

### 👨‍🔬 For Experts
- Provide agricultural consultancy
- Answer queries posted by farmers
- Share blogs, news, and tips

## 🧰 Tech Stack

| Category      | Technology                            |
|---------------|----------------------------------------|
| Frontend      | Vite + React + TypeScript + TailwindCSS |
| Backend       | Node.js + Express.js                   |
| Admin / Dashboard | Vite + React + TypeScript + DaisyUI + TailwindCSS |
| Database      | MongoDB Atlas                          |
| Auth & Security | JWT (JSON Web Tokens)                |
| Payment       | Razorpay (optional)                    |
| Deployment    | GitHub + Render/Netlify/Vercel (optional) |

## 📂 Folder Structure
    Frontend   (Landing page & public marketplace)
    Backend    (Node.js & Express API server)
    Admin      (Admin, Farmer & Buyer dashboard)

### Steps To Run Project 

#### 1. Frontend
```bash
cd Frontend
npm install
npm run dev
```

#### 2. Backend
```bash
cd Backend
npm install
# Configure your .env file:
# MONGO_URI=your_mongodb_atlas_connection
# JWT_SECRET=your_jwt_secret_key
# PORT=5000
npm run dev
```

#### 3. Admin Dashboard
```bash
cd Admin
npm install
npm run dev
```

## 🔮 Future Improvements
- Mobile App Integration (React Native)
- Live Weather API integration
- AI-based product recommendation
- Multilingual support
