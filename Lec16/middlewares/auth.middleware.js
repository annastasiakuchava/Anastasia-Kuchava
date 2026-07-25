import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "ავტორიზაცია საჭიროა (ტოკენი აკლია)" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch {
    return res.status(401).json({ error: "არასწორი ან ვადაგასული ტოკენი" });
  }
};