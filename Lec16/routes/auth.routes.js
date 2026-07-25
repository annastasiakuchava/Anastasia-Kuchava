import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { upload, cloudinary } from '../middlewares/upload.middleware.js';

const router = Router();

// რეგისტრაცია
router.post('/register', validateBody(registerSchema), async (req, res) => {
  try {
    const { fullName, email, password, birthDate } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "იმეილი უკვე დაკავებულია" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword, birthDate });
    await user.save();

    res.status(201).json({ message: "რეგისტრაცია წარმატებულია" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ავტორიზაცია
router.post('/login', validateBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "არასწორი მონაცემები" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "არასწორი მონაცემები" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, fullName: user.fullName } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// პროფილის ფოტოს ატვირთვა / განახლება
router.post('/profile-image', isAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "გთხოვთ აირჩიოთ ფოტო" });
    }

    const user = await User.findById(req.user.id);
    
    if (user.profileImage) {
      const publicId = user.profileImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
    }

    user.profileImage = req.file.path;
    await user.save();

    res.json({ message: "პროფილის ფოტო წარმატებით განახლდა", profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// პროფილის ფოტოს წაშლა
router.delete('/profile-image', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.profileImage) {
      return res.status(400).json({ error: "თქვენ არ გაქვთ ატვირთული პროფილის ფოტო" });
    }

    const publicId = user.profileImage.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`user_profiles/${publicId}`);

    user.profileImage = "";
    await user.save();

    res.json({ message: "პროფილის ფოტო წარმატებით წაიშალა" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;