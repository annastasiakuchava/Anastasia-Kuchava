import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

blogSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await mongoose.model('User').findByIdAndUpdate(doc.author, {
      $pull: { blogs: doc._id }
    });
  }
  next();
});

export const Blog = mongoose.model('Blog', blogSchema);