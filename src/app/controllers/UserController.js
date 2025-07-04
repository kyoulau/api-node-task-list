import User from "../models/User";
import AppError from "../error/AppError";
import * as Yup from "yup";
import { or } from "sequelize";


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

      return res.status(201).json(
        { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          "status": "success",
        }
      );
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return next(new AppError(`Validation error: ${error.errors.join(', ')}`, 400));
      }
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: [
          'id',
          'name',
          'email',
          'created_at',
          'updated_at',
        ]
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

  async findAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows: usersForFind } = await User.findAndCountAll({
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        attributes: [
          'id',
          'name',
          'email',
          'created_at',
          'updated_at',
        ],
        order: [
          ['id', 'DESC']
        ],
      });
      return res.json({
        "status": "success",
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10),
        usersForFind,
      });
    } catch (error) {
      return next(error);
    }
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
          updatedEmail,
          "status": "success",
        }
      );
      } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return next(new AppError(`Erro de validação: ${error.errors.join(', ')}`, 400));
      }
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const userForDelete = await User.findByPk(req.userId);

      if (!userForDelete) {
        throw new AppError('User not found', 404);
      }

      await userForDelete.destroy();
      return res.json({
        "status": "User deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();

