// import { Router } from "express";
// import { fighterService } from "../services/fighterService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";
// import {
//   createFighterValid,
//   updateFighterValid,
// } from "../middlewares/fighter.validation.middleware.js";

// const router = Router();

// // TODO: Implement route controllers for fighter

// export { router };

import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/fighters", async (req, res, next) => {
  try {
    // Отримання списку бійців
    const fighters = await fighterService.getAll();
    
    // Передача списку бійців у відповідь
    res.data = fighters;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.get("/fighters/:id", async (req, res, next) => {
  try {
    // Отримання бійця за ідентифікатором
    const fighter = await fighterService.getById(req.params.id);
    
    // Передача бійця у відповідь
    res.data = fighter;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.post("/fighters", createFighterValid, async (req, res, next) => {
  try {
    // Створення нового бійця
    const fighter = await fighterService.create(req.body);
    
    // Передача створеного бійця у відповідь
    res.data = fighter;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.patch("/fighters/:id", updateFighterValid, async (req, res, next) => {
  try {
    // Оновлення бійця за ідентифікатором
    const fighter = await fighterService.update(req.params.id, req.body);
    
    // Передача оновленого бійця у відповідь
    res.data = fighter;
  } catch (err) {
    // Обробка помилок
    res.err = err.message;
  } finally {
    // Виклик middleware для формування відповіді
    next();
  }
}, responseMiddleware);

router.delete("/fighters/:id", async (req, res, next) => {
  try {
    // Видалення бійця за ідентифікатором
    await fighterService.delete(req.params.id);
    
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
