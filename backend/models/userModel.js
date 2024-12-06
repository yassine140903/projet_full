const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { type } = require('os');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'provide your Username'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'Email must be unique'],
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: [true, 'phoneNumber must be unique'],
      validate: {
        validator: function (v) {
          return /^\d{8}$/.test(v); // Validates 8-digit phone numbers
        },
        message: 'Please enter a valid 8-digit phone number',
      },
    },
    image: { type: String, default: 'default.jpg' },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      // This only works on CREATE and SAVE!!!
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    posts: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    profilePicture: { type: String },
    bio: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    location: {
      address: String,
    },
  }
  // this is important { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.CreatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
