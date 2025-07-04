import jwt from 'jsonwebtoken';
import { promisify } from 'util'; //usaremos esse carapara transformar a função callback em async await do jwt.verify()
import { secret_token, expiresIn } from '../../config/auth';
import AppError from '../error/AppError'

export default async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token Bearer not provided" });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, secret_token);
    // console.log(decoded)
    // vai pegar pelo próprio payload o id do usuario abaixo 
    req.userId = decoded.id; 
    return next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
}