import mongoose from 'mongoose';
import { IUser } from '../types/schemas/user';

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhotoUrl: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
  }
},  {timestamps: true}
);

const User = mongoose.model('User', userSchema)

export default User