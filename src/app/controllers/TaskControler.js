import Task from "../models/Task";
import AppError from "../error/AppError";
import * as Yup from "yup";



class TaskController {
  async store(req, res, next) {

    const schema = Yup.object().shape({
    task: Yup.string().required(),
    })

    try {
      await schema.validate(req.body, { abortEarly: false });
      const { task } = req.body;

      const taskForCreate = await Task.create(
        {
          task,
          user_id: req.userId
        }
      )

      return res.status(201).json(
        {
          status: "success",
          "task": taskForCreate,
          "user_id": req.userId
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
      const tasks = await Task.findAll({
        where: { user_id: req.userId },
        attributes: [
          'id',
          'task',
          'check',
          'created_at',
        ],
        order: [
          ['id', 'DESC']
        ],

      })

      return res.json({
        "status": "success",
        "tasks": tasks
      });
    } catch (error) {
      return next(error);
    }
  }

    async findTaskWhereCheckIsTrue(req, res, next) {
    try {
      const tasks = await Task.findAll({
        where: { user_id: req.userId },
        check: true,
        attributes: [
          'id',
          'task',
          'check',
          'created_at',
        ],
        order: [
          ['id', 'DESC']
        ],

      })

      return res.json({
        "status": "success",
        "tasks": tasks
      });
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { task_id } = req.params;

      const taskForDelete = await Task.findByPk(task_id);

      if ( !taskForDelete ) {
        throw new AppError('Task not found', 404);
      }

      if ( taskForDelete.user_id !== req.userId ) {
        throw new AppError('Unauthorized', 401);
      }

      if ( taskForDelete.check !== true ) {
        throw new AppError('Finalize a tarefa antes de excluir', 400);
      } else {
        await taskForDelete.destroy();
        return res.json({
          "status": "success",
        });
      } 

    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      task: Yup.string(),
      check: Yup.boolean(),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
      const { task_id } = req.params;

      const taskForUpdate = await Task.findByPk(task_id);

      if ( !taskForUpdate ) {
        throw new AppError('Task not found', 404);
      }

       if (taskForUpdate.user_id !== req.userId) {
        throw new AppError('Unauthorized', 401);
      }

      await taskForUpdate.update(req.body);

      return res.json({
        task: taskForUpdate,
        status: "success",
      });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
        return next(new AppError(`Validation error: ${error.errors.join(', ')}`, 400));
      }
        return next(error);
    }
  }

}

export default new TaskController();

