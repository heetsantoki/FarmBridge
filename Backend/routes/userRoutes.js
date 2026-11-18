const express = require('express');
const upload = require('../config/multerConfig');
const { 
  sendRegistrationOTP,
  registerUser, 
  loginUser, 
  googleAuth,
  requestPasswordReset,
  confirmPasswordReset,
  completePasswordReset,
  updateProfile, 
  getAllUsers,
  deleteAccount 
} = require('../controllers/userController');
const verifyToken = require("../middleware/authmiddleware");
const User = require('../models/User');

const router = express.Router();

// Registration with OTP
router.post('/send-otp', sendRegistrationOTP);
router.post('/register', upload.fields([{ name: 'proofDocument' }, { name: 'profilePhoto' }]), registerUser);

// Login & Google Auth
router.post('/login', loginUser);
router.post('/google-auth', googleAuth);

// Enhanced 3-Step Password Reset
router.post('/forgot-password', requestPasswordReset);
router.post('/confirm-password-reset', confirmPasswordReset);
router.post('/reset-password', completePasswordReset);

// User Profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const profilePicUrl = user?.profilePhoto
        ? (user.profilePhoto.startsWith('http') ? user.profilePhoto : `http://localhost:5000/uploads/${user.profilePhoto}`)
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

router.put('/profile', verifyToken, upload.fields([{ name: 'proofDocument' }, { name: 'profilePhoto' }]), updateProfile);
router.delete('/account', verifyToken, deleteAccount);
router.get('/all', verifyToken, getAllUsers);

module.exports = router;
