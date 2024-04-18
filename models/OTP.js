import mongoose from 'mongoose';

const { Schema } = mongoose;

const otpSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // Définir une expiration de 10 minutes pour le code OTP
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
