export const randomBlocker = (req, res, next) => {
  const shouldBlock = Math.random() < 0.5;
  if (shouldBlock) {
    return res.status(500).json({ error: "მოთხოვნა შემთხვევითად დაიბლოკა (50% შანსი)." });
  }
  next();
};