// import { Router } from "express";
// import { fightersService } from "../services/fightService.js";
// import {
//   createUserValid,
//   updateUserValid,
// } from "../middlewares/user.validation.middleware.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";

// const router = Router();

// // OPTIONAL TODO: Implement route controller for fights

// export { router };


import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import {
  createFightValid,
  updateFightValid,
} from "../middlewares/fight.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/fights", async (req, res, next) => {
  try {
    // Отримання списку боїв
    const fights = await fightsService.getAll();
    
    // Передача списку боїв у відповідь
    res.data = fights;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.get("/fights/:id", async (req, res, next) => {
  try {
    // Отримання бою за ідентифікатором
    const fight = await fightsService.getById(req.params.id);
    
    // Передача бою у відповідь
    res.data = fight;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.post("/fights", createFightValid, async (req, res, next) => {
  try {
    // Створення нового бою
    const fight = await fightsService.create(req.body);
    
    // Передача створеного бою у відповідь
    res.data = fight;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.patch("/fights/:id", updateFightValid, async (req, res, next) => {
  try {
    // Оновлення бою за ідентифікатором
    const fight = await fightsService.update(req.params.id, req.body);
    
    // Передача оновленого бою у відповідь
    res.data = fight;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.delete("/fights/:id", async (req, res, next) => {
  try {
    // Видалення бою за ідентифікатором
    await fightsService.delete(req.params.id);
    
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
