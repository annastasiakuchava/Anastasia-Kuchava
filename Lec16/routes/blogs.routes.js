import { Router } from 'express';
import { Blog } from '../models/blog.model.js';
import { User } from '../models/user.model.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { blogCreateSchema } from '../validators/blog.validator.js';

const router = Router();

router.use(isAuth);

router.post('/', validateBody(blogCreateSchema), async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { blogs: blog._id } });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('author', 'fullName email');
  res.json(blogs);
});

router.put('/:id', validateBody(blogCreateSchema), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "ბლოგი ვერ მოიძებნა" });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "თქვენ არ ხართ ამ ბლოგის მფლობელი!" });
    }

    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "ბლოგი ვერ მოიძებნა" });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "თქვენ არ ხართ ამ ბლოგის მფლობელი!" });
    }

    await Blog.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "ბლოგი წარმატებით წაიშალა" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;