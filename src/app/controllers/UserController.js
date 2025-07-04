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

  async update(req, res, next) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Formato de e-mail inválido'),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6, 'A nova senha deve ter no mínimo 6 caracteres')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('A nova senha é obrigatória ao informar a antiga') : field
        ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const { email, oldPassword } = req.body;
      const user = await User.findByPk(req.userId);

      if ( email && email !== user.email ){
        const emailAlreadyExists = await User.findOne(
          {
            where: { email }
          }
        )
        if( emailAlreadyExists ){
          throw new AppError('Email already exists', 400);
        }
      }

      if ( oldPassword && !(await user.checkPassword(oldPassword)) ){
        throw new AppError('Senha esta incorreta!', 401);
      }

      const { id, name, email:updatedEmail } = await user.update(req.body);
      return res.json(
        {
          id, 
          name, 
          updatedEmail 
        }
      );
      } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return next(new AppError(`Erro de validação: ${error.errors.join(', ')}`, 400));
      }
      return next(error);
    }
  }

  async destroy(req, res) {

  }
}

export default new UserController();

