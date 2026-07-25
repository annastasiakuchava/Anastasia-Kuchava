import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const role = req.headers['role'];

  if (role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'წვდომა უარყოფილია: მხოლოდ ადმინისტრატორს აქვს ამის უფლება' });
  }
};