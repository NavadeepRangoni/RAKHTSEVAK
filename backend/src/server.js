const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config(); // Load environment variables

const app = express();
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000","http://localhost:3003","http://localhost:3002"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("sendMessage", (messageData) => {
    io.emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ 1. Dynamic CORS Handling
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true); // ✅ Allow all localhost origins
      } else {
        console.error(`❌ CORS Blocked: ${origin}`);
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // ✅ Middleware for JSON requests

// ✅ 2. Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blood-donor";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  });

// ✅ 3. Load Models
const User = require("./models/User"); // Ensure this file exists
const Donor = require("./models/Donor"); // Ensure this file exists

// ✅ 4. Import Routes
const donorsRoutes = require("./routes/donors"); // Ensure donors.js exists in routes

// ✅ 5. Use Routes
app.use("/api/donors", donorsRoutes); // 📌 Donor-related routes

// ✅ 6. Test Route
app.get("/", (req, res) => {
  res.send("🚀 Blood Donor Server is Running...");
});

// ✅ 7. User Registration Route
app.post("/api/users/register", async (req, res) => {
  try {
    console.log("📩 Registration request received:", req.body);

    const { email, password, name, bloodType, city, contact } = req.body;
    if (!email || !password || !name || !bloodType || !city || !contact) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "❌ User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, bloodType, city, contact });
    await newUser.save();

    console.log(`✅ User registered: ${email}`);
    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ✅ 8. User Login Route
app.post("/api/users/login", async (req, res) => {
  try {
    console.log("🔑 Login request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "❌ Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "❌ Invalid credentials." });
    }

    console.log(`✅ User logged in: ${email}`);
    res.json({ message: "✅ Login successful!" });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ✅ 9. Start the Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
