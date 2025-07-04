import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Task from "../app/models/Task";

const models = [User, Task];

// Ler a configuração do banco de dados.
// Importar todos os seus models (User, Task, etc.).
// Chamar o método init() de cada model, registrando seus campos no Sequelize.
// Chamar o método associate() de cada model para criar os relacionamentos (ex: uma Tarefa pertence a um Usuário).

class Database{
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    
    models.map(model => model.init(this.connection));
    
    models.map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();