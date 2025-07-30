// import express from 'express';

// const PORT = 3000;

// const app = express();

// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

////////////////////////////

// src/index.js

// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';

// const PORT = 3000;

// const app = express();

// app.use(cors()); // ✅ Додай CORS тут

// // pino // pino-pretty
// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );

// // Middleware для логування часу запиту
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// // наприклад, у запитах POST або PATCH
// app.use(express.json());

// // Маршрут для обробки GET-запитів на '/'
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello, World!',
//   });
// });

// // Middleware для обробких помилок (приймає 4 аргументи) -- rастомний mw
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: 'Something went wrong',
//     error: err.message,
//   });
// });

// //Кастомний mw для  для обробки всіх запитів, які не відповідають жодному існуючому маршруту --> http://localhost:3000/random
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: 'Route not found',
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//.................................................//

// **Оскільки ініціалізація сервера тепер відбувається у файлі src/server.js, то вміст файлу src/index.js буде виглядати наступним чином: */
//..............................
// import { startServer } from './server.js';

// startServer();
//.............................................

/**Тепер у файлі src/index.js ми створимо функцію bootstrap, яка буде ініціалізувати підключення до бази даних, після чого запускати сервер. */

import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
