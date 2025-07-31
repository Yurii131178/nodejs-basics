import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import crypto from 'node:crypto';

import { getEnvVar } from './utils/getEnvVar.js';

//Імпортуємо функції сервісу students та використовуємо їх у контролерах:
import { getAllStudents, getStudentById } from './services/students.js';

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
  // app.use((req, res, next) => {
  //   req.id = crypto.randomUUID();
  //   next();
  // });

  // // controller
  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello world!',
  //     id: req.id,
  //   });
  // });

  /**створимо два нових маршрути для GET-запитів:
   * /students - маршрут для отримання колекції всіх студентів
   * /students/:studentId - маршрут для отримання студента за його id
   */

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    // Відповідь, якщо контакт не знайдено
    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      data: student,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went really wrong',
      error: err.message,
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
