// import { Router } from "express";
// import { userService } from "../services/userService.js";
// import {
//   createUserValid,
//   updateUserValid,
// } from "../middlewares/user.validation.middleware.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";

// const router = Router();

// // TODO: Implement route controllers for user

// export { router };



import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/users", async (req, res, next) => {
  try {
    // Отримання списку користувачів
    const users = await userService.getAll();
    
    // Передача списку користувачів у відповідь
    res.data = users;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.get("/users/:id", async (req, res, next) => {
  try {
    // Отримання користувача за ідентифікатором
    const user = await userService.getById(req.params.id);
    
    // Передача користувача у відповідь
    res.data = user;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.post("/users", createUserValid, async (req, res, next) => {
  try {
    // Створення нового користувача
    const user = await userService.create(req.body);
    
    // Передача створеного користувача у відповідь
    res.data = user;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.patch("/users/:id", updateUserValid, async (req, res, next) => {
  try {
    // Оновлення користувача за ідентифікатором
    const user = await userService.update(req.params.id, req.body);
    
    // Передача оновленого користувача у відповідь
    res.data = user;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.delete("/users/:id", async (req, res, next) => {
  try {
    // Видалення користувача за ідентифікатором
    await userService.delete(req.params.id);
    
    // Передача успішного статусу у відповідь
    res.data = { success: true };
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

export { router };
