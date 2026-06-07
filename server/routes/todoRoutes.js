import express from 'express'
import{ getTodos,createTodo,updateTodo,deleteTodo} from '../controllers/todoControllers.js'
import protect from "../middleware/authMiddleware.js";

const router = express.Router()
router.get("/", protect, getTodos)
router.post("/", createTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)
export default router