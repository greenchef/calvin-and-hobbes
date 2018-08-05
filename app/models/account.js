const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const AccountSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  favoriteQuotes: [{
    type: Schema.Types.ObjectId, ref: 'Quote',
  }],
  salt: String,
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

AccountSchema.pre('save', function presave(next) {
  if (!this.isModified('password')) return next();
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(this.password, salt);
  this.salt = salt;
  this.password = hash;
  return next();
});


AccountSchema.methods = {
  authenticate: function authenticate(candidatePassword) {
    return bcrypt.hashSync(candidatePassword, this.salt) === this.password;
  },
  generateJWT: function generateJWT() {
    return jwt.sign({
      id: this.id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 1000 * 60 });
  },
};

AccountSchema.plugin(uniqueValidator, { message: 'is already taken.' });

mongoose.model('Account', AccountSchema);
