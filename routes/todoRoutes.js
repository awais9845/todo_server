import { Router } from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

const router = Router();

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);
router.delete("/deleteAllTodos", deleteAllTodos);

export default router;
