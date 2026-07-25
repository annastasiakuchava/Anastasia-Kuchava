export const validateExpenseCreate = (req, res, next) => {
  const { title, amount } = req.body;
  if (!title || typeof title !== 'string' || !amount || typeof amount !== 'number') {
    return res.status(400).json({ error: "არასწორი მონაცემები! 'title' (string) და 'amount' (number) სავალდებულოა." });
  }
  next();
};