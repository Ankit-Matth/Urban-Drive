import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    name: {
      type: String,
      required: true
    },
    countryCode: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  isBlocked: { 
    type: Boolean,
    default: false
  }
});

const UserModel = mongoose.models?.User || mongoose.model('User', userSchema);

export default UserModel;
