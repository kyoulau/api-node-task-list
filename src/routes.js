import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import TaskControler from "./app/controllers/TaskControler";

const routes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário.
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail único do usuário.
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário (mínimo 6 caracteres).
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário.
 *         name:
 *           type: string
 *           description: Nome do usuário.
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário.
 */

routes.get('/', (req, res) => res.send('Hello World!'));

routes.post('/sessions', SessionController.store);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro de validação ou usuário já existente.
 */
routes.post('/user', UserController.store);

// rotas que precisam de autenticação
routes.use(authMiddleware);

routes.put('/user', UserController.update);
routes.get('/user', UserController.index);
routes.delete('/user/:id', UserController.destroy);
routes.get('/users', UserController.findAllUsers);


/**
 * @swagger
 * /task:
 *   post:
 *     summary: Cria uma nova tarefa para o usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Não autorizado - token inválido ou não fornecido.
 */
routes.post('/task', TaskControler.store);

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Lista todas as tarefas do usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResponse'
 *       401:
 *         description: Não autorizado - token inválido ou não fornecido.
 */
routes.get('/task', TaskControler.index);

/**
 * @swagger
 * /task/{task_id}:
 *   put:
 *     summary: Atualiza uma tarefa específica do usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Não autorizado - token inválido ou não fornecido.
 *       404:
 *         description: Tarefa não encontrada ou não pertence ao usuário.
 */
routes.put('/task/:task_id', TaskControler.update);

/**
 * @swagger
 * /task/{task_id}:
 *   delete:
 *     summary: Remove uma tarefa específica do usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa a ser removida.
 *     responses:
 *       204:
 *         description: Tarefa removida com sucesso.
 *       401:
 *         description: Não autorizado - token inválido ou não fornecido.
 *       404:
 *         description: Tarefa não encontrada ou não pertence ao usuário.
 */
routes.delete('/task/:task_id', TaskControler.destroy);

/**
 * @swagger
 * /task/check:
 *   get:
 *     summary: Lista todas as tarefas concluídas (check=true) do usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas concluídas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResponse'
 *       401:
 *         description: Não autorizado - token inválido ou não fornecido.
 */
routes.get('/task/check', TaskControler.findTaskWhereCheckIsTrue);


export default routes;