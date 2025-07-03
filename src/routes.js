import { Router } from "express";
import UserController from "./app/controllers/UserController";
const routes = Router();

routes.get('/', (req, res) => res.send('Hello World!'));

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.delete('/user/:id', UserController.destroy);

export default routes;