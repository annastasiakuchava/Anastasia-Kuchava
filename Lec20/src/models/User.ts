import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 }
});

export const User = model('User', userSchema);