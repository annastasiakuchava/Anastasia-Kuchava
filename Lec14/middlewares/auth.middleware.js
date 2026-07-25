export const checkSecretKey = (req, res, next) => {
  const secret = req.headers['secret'];
  if (secret === 'random123') {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: არასწორი საიდუმლო კოდი ჰედერში!" });
  }
};