const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const authMiddleware = require('../middleware/auth');

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new admin
    const admin = new Admin({
      name,
      email,
      password,
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "admin-local",
    { session: false },
    (err, admin, info) => {
      if (err) return next(err);
      if (!admin) {
        return res.status(401).json({ message: info.message });
      }

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    }
  )(req, res, next);
});

// Protected routes (require authentication)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).select("-password");
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard-data", authMiddleware, async (req, res) => {
  try {
    // Example of protected route returning sensitive data
    const data = {
      totalUsers: await User.countDocuments(),
      totalOrders: await Order.countDocuments(),
      revenue: await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
