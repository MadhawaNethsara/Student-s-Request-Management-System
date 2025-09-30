const express = require("express");
const { login, verify } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/verify", authMiddleware, verify);

// 👇 Add this line
router.get("/me", authMiddleware, verify);

module.exports = router;
