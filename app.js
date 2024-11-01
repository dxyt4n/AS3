const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Import routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

// API R1 - Trả về thông tin cá nhân
app.get("/info", (req, res) => {
    res.json({
        data: {
            fullName: "Nguyen Van A",
            studentCode: "QNUO1234"
        }
    });
});

module.exports = app;
