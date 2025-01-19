import { Router } from "express";
import { 
    createTask, 
    getAllTasks, 
    getTaskById, 
    updateTask, 
    deleteTask 
} from "../controller/task.controller";
import { VerifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.use(VerifyJWT);

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:taskId", getTaskById);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;