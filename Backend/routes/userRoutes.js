const express = require('express');
const upload = require('../config/multerConfig');
const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require("../middleware/authmiddleware");
const User = require('../models/User');

const router = express.Router();

router.post('/register', upload.fields([{ name: 'proofDocument' }, { name: 'profilePhoto' }]), registerUser);
router.post('/login', loginUser);

router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const profilePicUrl = user?.profilePhoto
        ? `http://localhost:5000/uploads/${user.profilePhoto}`
        : "http://localhost:5000/default-avatar.png";
  
      const proofDocumentUrl = user?.proofDocument
        ? `http://localhost:5000/uploads/${user.proofDocument}`
        : "http://localhost:5000/default-proof.png";
  
      res.json({
        user: {
          ...user._doc,
          profilePhoto: profilePicUrl,
          proofDocument: proofDocumentUrl
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;