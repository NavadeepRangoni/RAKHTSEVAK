# RakhtSevak - Blood Donation Web Application

RakhtSevak is an innovative web application designed to connect blood donors with recipients in need. It provides real-time donor availability, a chatbot for queries, and a modern UI/UX for a seamless experience.

## 🚀 Features
- **Donor Registration** - Users can register as blood, plasma, or organ donors.
- **Recipient Requests** - Recipients can post urgent blood requests.
- **Real-Time Chat** - Donors and recipients can communicate via a live chat system.
- **Chatbot Assistance** - Provides information related to blood donation.
- **Donor Badge System** - Rewards frequent donors with badges.
- **Donation Tracking** - Tracks last donation date and eligibility.
- **Live Notifications** - Alerts users about donor availability and eligibility restoration.
- **Modern UI/UX** - Smooth scrolling, animations, and interactive UI.

## 🏗 Tech Stack
### **Frontend** (React.js)
- React.js with TailwindCSS
- React Router
- WebSocket for real-time chat
- Framer Motion for animations

### **Backend** (Node.js + Express.js + MongoDB)
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io for live chat
- Twilio API for SMS notifications

## 📂 Folder Structure
```
RakhtSevak/
│── frontend/         # React Frontend
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # App Pages
│   │   ├── services/    # API Calls
│   │   ├── App.js       # Main App File
│   │   ├── index.js     # Entry Point
│   ├── public/         # Static Files
│   ├── package.json    # Frontend Dependencies
│
│── backend/          # Express Backend
│   ├── src/
│   │   ├── controllers/  # Route Handlers
│   │   ├── middleware/   # Auth & Validation
│   │   ├── models/       # MongoDB Schemas
│   │   ├── routes/       # API Routes
│   │   ├── utils/        # Utility Functions
│   │   ├── server.js     # Entry Point
│   ├── .env             # Environment Variables
│   ├── package.json     # Backend Dependencies
│
└── README.md          # Project Documentation
```

## 🛠 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_ORG_NAME/rakhtsevak.git
cd rakhtsevak
```

### 2️⃣ Setup Backend
```sh
cd backend
npm install
cp .env.example .env  # Add required env variables
npm start
```

### 3️⃣ Setup Frontend
```sh
cd ../frontend
npm install
npm start
```

## 📌 Contribution Guidelines
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit changes (`git commit -m "Added new feature"`).
4. Push to GitHub and open a Pull Request.

## 📜 License
This project is licensed under the **MIT License**.

---
🔥 Made with ❤️ by the RakhtSevak Team.

