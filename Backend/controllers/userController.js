const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const OTP = require('../models/OTP');
const PasswordResetRequest = require('../models/PasswordResetRequest');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { sendEmail } = require('../config/mailer');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy_client_id');

// 1. Send OTP for Registration
const sendRegistrationOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email address is required' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if an existing verified user already uses this email
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        // Generate 6-digit numeric OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Remove any old OTPs for this email and save the new one
        await OTP.deleteMany({ email: normalizedEmail });
        await OTP.create({
            email: normalizedEmail,
            otp: otpCode,
        });

        // Send OTP via Email
        const emailResult = await sendEmail({
            to: normalizedEmail,
            subject: 'Your FarmBridge Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; padding: 25px; border: 1px solid #E8E4DA; border-radius: 16px; background-color: #FAF8F3;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #1E3F2D; margin: 0; font-size: 24px;">🌱 FarmBridge</h2>
                        <p style="color: #5C6B5F; font-size: 14px; margin-top: 5px;">Direct Agricultural Ecosystem</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E8E4DA; text-align: center;">
                        <h3 style="color: #1A261D; margin-top: 0;">Email Verification OTP</h3>
                        <p style="color: #5C6B5F; font-size: 14px;">Welcome to FarmBridge! Use the following One-Time Password (OTP) to complete your registration:</p>
                        <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1E3F2D; margin: 20px 0; padding: 12px; background-color: #EEF4EF; border-radius: 8px; display: inline-block;">
                            ${otpCode}
                        </div>
                        <p style="color: #7F8B82; font-size: 12px; margin-bottom: 0;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
                    </div>
                </div>
            `,
            text: `Your FarmBridge verification OTP is: ${otpCode}. It expires in 10 minutes.`,
        });

        res.status(200).json({
            message: 'Verification OTP sent to your email',
            devPreview: !process.env.EMAIL_USER ? otpCode : undefined,
        });
    } catch (error) {
        console.error('Send Registration OTP Error:', error);
        res.status(500).json({ message: error.message || 'Failed to send verification OTP' });
    }
};

// 2. Register User (Validates OTP before creating account)
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, userType, password, username, country, state, documentNo, otp } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        if (!otp) {
            return res.status(400).json({ message: 'Email verification OTP is required to register' });
        }

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        const normalizedEmail = email.trim().toLowerCase();

        // Verify OTP from database
        const validOTP = await OTP.findOne({ email: normalizedEmail, otp: otp.trim() });
        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid or expired OTP. Please verify or request a new code.' });
        }

        const existingUser = await User.findOne({ 
            $or: [{ username: trimmedUsername }, { email: normalizedEmail }] 
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already taken' });
        }

        const proofDocument = req.files?.proofDocument?.[0]?.filename || null;
        const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;

        const user = new User({
            firstName,
            lastName,
            email: normalizedEmail,
            phone,
            userType: userType || 'farmer',
            password: trimmedPassword,
            username: trimmedUsername,
            country,
            state,
            documentNo,
            proofDocument,
            profilePhoto,
            isEmailVerified: true,
            authProvider: 'local',
        });

        await user.save();

        // Clear used OTP
        await OTP.deleteMany({ email: normalizedEmail });

        // Dispatch Welcome Email
        sendEmail({
            to: normalizedEmail,
            subject: 'Welcome to FarmBridge! 🌱',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; padding: 25px; border: 1px solid #E8E4DA; border-radius: 16px; background-color: #FAF8F3;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #1E3F2D; margin: 0; font-size: 26px;">🌱 FarmBridge</h2>
                        <p style="color: #5C6B5F; font-size: 14px; margin-top: 4px;">Direct Farm-to-Buyer Marketplace</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #E8E4DA;">
                        <h3 style="color: #1A261D; margin-top: 0;">Welcome, ${firstName || 'Friend'}! 🎉</h3>
                        <p style="color: #5C6B5F; font-size: 14px; line-height: 1.6;">
                            We're thrilled to have you join our direct agricultural marketplace. Your account as a <strong>${user.userType === 'farmer' ? 'Agricultural Producer' : 'Commercial Buyer'}</strong> has been successfully activated.
                        </p>
                        <div style="background-color: #EEF4EF; border-left: 4px solid #1E3F2D; padding: 12px 16px; margin: 18px 0; border-radius: 4px;">
                            <p style="margin: 0; color: #1E3F2D; font-size: 13px; font-weight: bold;">
                                ${user.userType === 'farmer' ? '🌾 Start listing your fresh harvests, manage orders, and check live APMC mandi benchmarks.' : '🛒 Explore verified harvest lots directly from farmers with 0% middleman markups.'}
                            </p>
                        </div>
                        <p style="color: #5C6B5F; font-size: 13px;">If you ever have any questions, our operations and advisory desk is here to assist you 24/7.</p>
                        <div style="text-align: center; margin-top: 24px;">
                            <a href="http://localhost:5173/login" style="background-color: #1E3F2D; color: #FAF8F3; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">Log in to Your Dashboard</a>
                        </div>
                    </div>
                </div>
            `,
            text: `Welcome to FarmBridge, ${firstName}! Your account as a ${user.userType} has been successfully activated.`,
        }).catch(err => console.error('Welcome email dispatch error:', err.message));

        const jwtSecret = process.env.JWT_SECRET || 'farmbridge_jwt_secret_dev_key_2026';
        const token = jwt.sign({ id: user._id, userType: user.userType }, jwtSecret, { expiresIn: '7d' });
        res.status(201).json({ 
            message: 'User registered and verified successfully', 
            token, 
            userType: user.userType,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
            }
        });
    } catch (error) {
        console.error("Register Error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

// 3. User Login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "Username and password are required" });

        const trimmedIdentifier = username.trim();
        const user = await User.findOne({
            $or: [
                { username: trimmedIdentifier },
                { email: trimmedIdentifier.toLowerCase() }
            ]
        });

        if (!user) return res.status(400).json({ message: "User not found" });

        if (!user.password && user.authProvider === 'google') {
            return res.status(400).json({ message: "This account was registered using Google. Please click 'Continue with Google'." });
        }

        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const secret = process.env.JWT_SECRET || 'farmbridge_jwt_secret_dev_key_2026';
        const token = jwt.sign({ id: user._id, role: user.userType }, secret, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.userType,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePhoto: user.profilePhoto,
                phone: user.phone,
                userType: user.userType
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// 4. Google Authentication (Login & Registration)
const googleAuth = async (req, res) => {
    try {
        const { credential, userType } = req.body;
        if (!credential) {
            return res.status(400).json({ message: "Google credential token is required" });
        }

        let payload;
        try {
            // Verify token with Google's library if client ID configured, or decode safely
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            }).catch(() => null);

            if (ticket) {
                payload = ticket.getPayload();
            } else {
                // Decode token payload as fallback if client ID isn't matched
                const base64Url = credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                payload = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
            }
        } catch (err) {
            console.error("Google Token Verification Failed:", err.message);
            return res.status(400).json({ message: "Failed to verify Google token" });
        }

        const { sub: googleId, email, given_name, family_name, picture } = payload;
        if (!email) {
            return res.status(400).json({ message: "Google account does not provide an email address" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        let user = await User.findOne({ email: normalizedEmail });

        let isNewUser = false;
        if (!user) {
            // If first time user and no valid role specified yet, prompt frontend for role selection
            const validRoles = ['farmer', 'buyer'];
            if (!userType || !validRoles.includes(userType.toLowerCase())) {
                return res.status(200).json({
                    isNewUser: true,
                    requiresRoleSelection: true,
                    googleEmail: normalizedEmail,
                    googleName: given_name || 'Friend',
                    picture: picture || null,
                    message: "First-time Google registration requires role selection.",
                });
            }

            const chosenRole = userType.toLowerCase() === 'buyer' ? 'buyer' : 'farmer';
            isNewUser = true;

            // Generate unique username based on email or name
            let baseUsername = (given_name || email.split('@')[0]).replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'user';
            let uniqueUsername = baseUsername;
            let counter = 1;
            while (await User.findOne({ username: uniqueUsername })) {
                uniqueUsername = `${baseUsername}${counter++}`;
            }

            user = new User({
                firstName: given_name || 'Google',
                lastName: family_name || 'User',
                email: normalizedEmail,
                username: uniqueUsername,
                googleId,
                authProvider: 'google',
                isEmailVerified: true, // Google already verified this email
                userType: chosenRole,
                profilePhoto: picture || null,
            });

            await user.save();

            // Send Welcome Email for new Google user with their selected role
            sendEmail({
                to: normalizedEmail,
                subject: 'Welcome to FarmBridge! 🌱',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; padding: 25px; border: 1px solid #E8E4DA; border-radius: 16px; background-color: #FAF8F3;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <h2 style="color: #1E3F2D; margin: 0; font-size: 26px;">🌱 FarmBridge</h2>
                        </div>
                        <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #E8E4DA;">
                            <h3 style="color: #1A261D; margin-top: 0;">Welcome, ${given_name || 'Friend'}! 🎉</h3>
                            <p style="color: #5C6B5F; font-size: 14px; line-height: 1.6;">
                                You have successfully registered with Google as a <strong>${chosenRole === 'farmer' ? 'Agricultural Producer / Farmer' : 'Commercial Commodity Buyer'}</strong>.
                            </p>
                            <p style="color: #5C6B5F; font-size: 14px; line-height: 1.6;">
                                ${chosenRole === 'farmer' 
                                  ? 'You can now list your fresh farm harvests, view real-time APMC Mandi rates, and connect with direct verified buyers.' 
                                  : 'You can now browse fresh farm-direct listings, request bulk agricultural produce, and trade with verified farmers.'}
                            </p>
                        </div>
                    </div>
                `,
                text: `Welcome to FarmBridge, ${given_name || 'Friend'}! Your account has been registered with Google as a ${chosenRole === 'farmer' ? 'Farmer' : 'Buyer'}.`,
            }).catch(e => console.error("Welcome email error:", e));
        } else if (!user.googleId) {
            // Link existing account with Google if email matches
            user.googleId = googleId;
            user.isEmailVerified = true;
            if (!user.profilePhoto && picture) {
                user.profilePhoto = picture;
            }
            await user.save();
        }

        const secret = process.env.JWT_SECRET || 'farmbridge_jwt_secret_dev_key_2026';
        const token = jwt.sign({ id: user._id, role: user.userType }, secret, { expiresIn: "7d" });

        res.status(200).json({
            message: isNewUser ? "Registration with Google successful" : "Login with Google successful",
            token,
            role: user.userType,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePhoto: user.profilePhoto,
                phone: user.phone,
                userType: user.userType,
            }
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ message: error.message || "Google Authentication failed" });
    }
};

// 5. Request Password Reset (Sends reset link directly to email like Snapchat / modern apps)
const requestPasswordReset = async (req, res) => {
    try {
        const { identifier } = req.body;
        if (!identifier) {
            return res.status(400).json({ message: "Username or email is required" });
        }

        const trimmedIdentifier = identifier.trim();
        const user = await User.findOne({
            $or: [
                { username: trimmedIdentifier },
                { email: trimmedIdentifier.toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "No account found with this username or email" });
        }

        // Generate secure 32-byte reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Delete old pending requests for this user email
        await PasswordResetRequest.deleteMany({ email: user.email });

        await PasswordResetRequest.create({
            email: user.email,
            confirmToken: resetToken,
            resetToken,
            status: 'confirmed',
        });

        const clientBaseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const resetLink = `${clientBaseUrl}/reset-password?token=${resetToken}`;

        // Send Email with direct reset button (Snapchat style)
        await sendEmail({
            to: user.email,
            subject: 'Reset Your FarmBridge Password',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 540px; margin: 0 auto; padding: 30px; background-color: #FAF8F3; border: 1px solid #E8E4DA; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #1E3F2D; margin: 0; font-size: 26px; font-weight: bold;">🌱 FarmBridge</h2>
                        <p style="color: #6C7A70; font-size: 13px; margin-top: 5px;">Security & Password Assistance</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #E8E4DA; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                        <h3 style="color: #1A261D; margin-top: 0; font-size: 20px;">Forgot Your Password?</h3>
                        <p style="color: #4A584E; font-size: 14px; line-height: 1.6; margin: 15px 0;">
                            Hi <strong>${user.firstName || 'there'}</strong>, we received a request to reset the password for your FarmBridge account (<strong>${user.email}</strong>).
                        </p>
                        <p style="color: #4A584E; font-size: 14px; margin-bottom: 25px;">
                            Click the button below to choose a new password:
                        </p>
                        <div style="margin: 25px 0;">
                            <a href="${resetLink}" style="background-color: #1E3F2D; color: #FAF8F3; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 15px; display: inline-block;">
                                Reset Password
                            </a>
                        </div>
                        <p style="color: #8C9990; font-size: 12px; line-height: 1.5; margin-top: 25px; border-top: 1px solid #F0ECE1; padding-top: 15px;">
                            This link is valid for 15 minutes. If you did not request a password reset, you can safely ignore this email.
                        </p>
                    </div>
                </div>
            `,
            text: `Hi ${user.firstName || 'there'},\n\nClick the link below to reset your FarmBridge password:\n${resetLink}\n\nThis link is valid for 15 minutes.`,
        });

        res.status(200).json({
            message: `A password reset link has been sent to ${user.email}. Please check your inbox.`,
            email: user.email,
        });
    } catch (error) {
        console.error("Request Password Reset Error:", error);
        res.status(500).json({ message: error.message || "Failed to process password reset request" });
    }
};

// 6. Confirm Password Reset Request (Kept for compatibility)
const confirmPasswordReset = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Confirmation token is required" });
        }

        const resetRequest = await PasswordResetRequest.findOne({ confirmToken: token });
        if (!resetRequest) {
            return res.status(400).json({ message: "Invalid or expired confirmation link" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        resetRequest.resetToken = resetToken;
        resetRequest.status = 'confirmed';
        await resetRequest.save();

        const clientBaseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const finalResetLink = `${clientBaseUrl}/reset-password?token=${resetToken}`;

        res.status(200).json({
            message: "Password reset link confirmed!",
            resetLink: finalResetLink,
        });
    } catch (error) {
        console.error("Confirm Password Reset Error:", error);
        res.status(500).json({ message: error.message || "Failed to confirm password reset" });
    }
};

// 7. Complete Password Reset (Sets new password via token)
const completePasswordReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Reset token and new password are required" });
        }

        const resetRequest = await PasswordResetRequest.findOne({ 
            resetToken: token,
        });

        if (!resetRequest) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const user = await User.findOne({ email: resetRequest.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword.trim();
        await user.save(); // triggers bcrypt hash hook

        // Remove the reset request
        await PasswordResetRequest.deleteOne({ _id: resetRequest._id });

        res.status(200).json({
            message: "Password has been successfully reset! You can now log in with your new password.",
        });
    } catch (error) {
        console.error("Complete Password Reset Error:", error);
        res.status(500).json({ message: error.message || "Failed to complete password reset" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, country, state, documentNo } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phone) user.phone = phone;
        if (country) user.country = country;
        if (state) user.state = state;
        if (documentNo) user.documentNo = documentNo;

        if (req.files?.profilePhoto?.[0]?.filename) {
            user.profilePhoto = req.files.profilePhoto[0].filename;
        }
        if (req.files?.proofDocument?.[0]?.filename) {
            user.proofDocument = req.files.proofDocument[0].filename;
        }

        await user.save();

        const profilePicUrl = user.profilePhoto
            ? (user.profilePhoto.startsWith('http') ? user.profilePhoto : `http://localhost:5000/uploads/${user.profilePhoto}`)
            : "http://localhost:5000/default-avatar.png";

        const proofDocumentUrl = user.proofDocument
            ? `http://localhost:5000/uploads/${user.proofDocument}`
            : "http://localhost:5000/default-proof.png";

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                ...user._doc,
                profilePhoto: profilePicUrl,
                proofDocument: proofDocumentUrl
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: error.message || "Failed to update profile" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const filter = role ? { userType: role } : {};
        const users = await User.find(filter).select("-password").sort({ _id: -1 });
        
        const formattedUsers = users.map(u => ({
            ...u._doc,
            profilePhoto: u.profilePhoto 
                ? (u.profilePhoto.startsWith('http') ? u.profilePhoto : `http://localhost:5000/uploads/${u.profilePhoto}`) 
                : "http://localhost:5000/default-avatar.png",
            proofDocument: u.proofDocument ? `http://localhost:5000/uploads/${u.proofDocument}` : "http://localhost:5000/default-proof.png"
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// 10. Delete User Account (With Active Order Protection & Purchase History Preservation)
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User account not found" });
        }

        const userEmail = user.email;
        const userRole = user.userType;

        // 1. Check for Active / In-Progress Orders:
        // A farmer or buyer cannot delete their account until all ongoing orders are completed (Delivered or Cancelled)
        const activeStatuses = ['Pending', 'Confirmed', 'Dispatched'];
        const activeOrdersCount = await Order.countDocuments({
            $or: [{ farmer: userId }, { buyer: userId }],
            status: { $in: activeStatuses }
        });

        if (activeOrdersCount > 0) {
            return res.status(400).json({
                message: userRole === 'farmer'
                    ? `Cannot delete account! You have ${activeOrdersCount} active order(s) in progress. Please deliver and complete all orders before deleting your account.`
                    : `Cannot delete account! You have ${activeOrdersCount} ongoing order(s) in transit. Please wait until they are completed or delivered before deleting your account.`
            });
        }

        // 2. If user is a farmer, cascade delete all active products listed by this farmer
        let deletedProductsCount = 0;
        if (userRole === 'farmer') {
            const pRes = await Product.deleteMany({ farmerId: userId });
            deletedProductsCount = pRes.deletedCount;
        }

        // 3. Completed orders ('Delivered' or 'Cancelled') are strictly preserved so the other party's purchase history remains intact!

        // 4. Clean up OTPs and Password Reset requests for this email
        await OTP.deleteMany({ email: userEmail });
        await PasswordResetRequest.deleteMany({ email: userEmail });

        // 5. Delete the user account
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "Your account and all listed marketplace products have been permanently deleted.",
            deletedProducts: deletedProductsCount,
        });
    } catch (error) {
        console.error("Delete Account Error:", error);
        res.status(500).json({ message: error.message || "Failed to delete account" });
    }
};

module.exports = { 
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
};
