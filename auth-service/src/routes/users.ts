import express from "express";
const router = express.Router();
import { userController as controller} from "../controllers";
import { tryCatch } from "../error/tryAndCatch";
import { verifyToken } from "../middlewares/token";
import { registerValidator, loginValidator } from "../validators";


router.get("/", tryCatch(verifyToken), tryCatch(controller.getUsers));
router.get("/:id", tryCatch(verifyToken), tryCatch(controller.getUser));
router.post("/", registerValidator, tryCatch(controller.createUser));
router.put("/:id", tryCatch(verifyToken), tryCatch(controller.updateUser));
router.delete("/:id", tryCatch(verifyToken), tryCatch(controller.deleteUser));
router.post("/login", loginValidator, tryCatch(controller.loginUser));

export default router;