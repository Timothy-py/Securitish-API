const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const safeboxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nCcontents:{
    type: Number,
    default: 0
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound unique index on 'name' and '_userId'
safeboxSchema.index({ name: 1, _userId: 1 }, { unique: true });

// Hash password before saving it to the database
safeboxSchema.pre("save", async function (next) {
  const safebox = this;
  if (safebox.isModified("password")) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    safebox.password = await bcrypt.hash(safebox.password, salt);
  }
  next();
});

// Compare provided password with the hashed password in the database
safeboxSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Safebox = mongoose.model("Safebox", safeboxSchema);

module.exports = Safebox;
