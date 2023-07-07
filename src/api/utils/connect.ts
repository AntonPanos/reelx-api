import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import config from '@/config';
import Logging from '@/library/logging';
import { AuthRouter, PostRouter, UserRouter } from '@/routes';

const router = express();

const connectDB = async (): Promise<Express> => {
  try {
    await mongoose.connect(`${config.DB_Path}`, { retryWrites: true });
    Logging.info('Connected to MongoDB');
    const server = startServer();
    return Promise.resolve(server);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Only start the server if Mongo Connects */
const startServer = (): Express => {
  router.use((req: Request, res: Response, next: NextFunction): void => {
    /** Log the Request */
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /** Log the Response */
      if (res.statusCode >= 400)
        Logging.error(
          `Result -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
        );
      else
        Logging.info(
          `Result -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
        );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(cookieParser());

  /** Rules of API */
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use('/auth', AuthRouter);
  router.use('/posts', PostRouter);
  router.use('/users', UserRouter);

  /** Health Check */
  router.get('/serverStatus', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Running' });
  });

  /** Error handling */
  router.use((req: Request, res: Response): Response => {
    const error = new Error('Not Found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  return router;
};

export default { connectDB };
