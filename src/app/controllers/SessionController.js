import jwt from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../error/AppError';
import { secret_token, expiresIn } from './../../config/auth';


class SessionController {
  async store(req, res) {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new AppError("User not found", 401);

    }

    //senha n bate
    if ( !(await user.checkPassword(password)) ) {
      throw new AppError("Password does not match", 401);
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, secret_token, {
        expiresIn: expiresIn,
      })

    })
  }
    catch (error) {
      console.log(error)
    }
  }
}

export default new SessionController();