const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    userType: { type: String, default: 'farmer' },
    password: { type: String, default: null },
    username: { type: String, unique: true },
    country: String,
    state: String,
    documentNo: String,
    proofDocument: String,
    profilePhoto: String,
    authProvider: { type: String, default: 'local' }, // 'local' or 'google'
    googleId: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
