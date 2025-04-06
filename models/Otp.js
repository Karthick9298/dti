const mongoose  = require("mongoose");

const otpSchema = new mongoose.Schema({
    phoneNumber: String,
    otp: String,
    ipAddress: String,
    createdAt: { type: Date, default: Date.now },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;