import User from "../models/User";
import AppError from "../error/AppError";
import * as Yup from "yup";


class UserController {
  async store(req, res, next) {

    const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6, 'Password must be at least 6 characters'),
    })

    try {
      await schema.validate(req.body, { abortEarly: false });
      const { name, email, password } = req.body;


      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        throw new AppError("User already exists.", 400);
      }

      const user = await User.create({ name, email, password });

      return res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return next(new AppError(`Validation error: ${error.errors.join(', ')}`, 400));
      }
      return next(error);
    }
  }

  async index(req, res) {

  }

  async destroy(req, res) {

  }
}

export default new UserController();

