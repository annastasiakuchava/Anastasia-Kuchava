import { Schema, model } from 'mongoose';

const quizSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

export const Quiz = model('Quiz', quizSchema);