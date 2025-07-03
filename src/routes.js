import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
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
routes.get('/user', UserController.index);
routes.delete('/user/:id', UserController.destroy);

export default routes;