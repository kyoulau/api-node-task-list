import { Router } from "express";
import User from "./app/models/User";

const routes = Router();

routes.get('/', (req, res) => res.send('Hello World!'));

routes.post('/teste', async (req, res) => {
  const user = await User.create({
    name: 'Matheus',
    email: 'matheus@matheus.com',
    password_hash: '123123',
  });

  return res.json(user);
});

export default routes;