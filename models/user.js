const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid").v1;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 50,
      unique: true,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    role: {
      type: Number,
      default: 0, // 0 for user, 1 for admin
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.virtual("password")
.set(function (password) {
  this._password = password;
  this.salt = uuid();
  this.hashed_password = this.cryptPassword(password);
})
.get(function (){
    return this._password;

});




userSchema.methods = {
authenticate:function(plainText){
  return this.cryptPassword(plainText) === this.hashed_password;
},

  cryptPassword: function (password) {
    if (!password) return "";
    try {
        return crypto
        .createHmac('sha1',this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
        return "";
    }
  },
};



module.exports=mongoose.model("User", userSchema);