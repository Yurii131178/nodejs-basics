import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import crypto from 'node:crypto';

import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors()); // або одразу після оголошення app !!!

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // middleware fo id generation
  app.use((req, res, next) => {
    req.id = crypto.randomUUID();
    next();
  });

  // controller
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
      id: req.id,
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went really wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
