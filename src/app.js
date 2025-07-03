import express from 'express';
import routes from './routes';
import './database';
import AppError from './app/error/AppError';

class App{
  constructor(){
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares(){
      this.server.use(express.json())
    };

    routes(){
      this.server.use(routes)
    };

    exceptionHandler(){
    this.server.use((err, req, res, next) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      console.error(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });
    }
}

export default new App().server;