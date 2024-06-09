// import { Router } from "express";
// import { authService } from "../services/authService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";

// const router = Router();

// router.post(
//   "/login",
//   (req, res, next) => {
//     try {
//       // TODO: Implement login action (get the user if it exist with entered credentials)
//       res.data = data;
//     } catch (err) {
//       res.err = err;
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// export { router };


import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      // Отримання облікових даних користувача із запиту
      const { email, password } = req.body;

      // Перевірка облікових даних користувача
      const user = await authService.login(email, password);

      // Перевірка, чи користувач з такими обліковими даними існує
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Якщо користувач існує, додати його дані до відповіді
      res.data = user;
    } catch (err) {
      // Якщо сталася помилка, додати її до відповіді
      res.err = err.message;
    } finally {
      // Викликати middleware для створення відповіді
      next();
    }
  },
  // Викликати middleware для створення відповіді
  responseMiddleware
);

export { router };
