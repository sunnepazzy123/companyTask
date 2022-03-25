import express from "express";
const router = express.Router();
import { userController as controller} from "../controllers";
import { tryCatch } from "../error/tryAndCatch";
import { userValidator } from "../validators";


router.get("/", tryCatch(controller.getUsers));
router.get("/:id", tryCatch(controller.getUser));
router.post("/", userValidator, tryCatch(controller.createUser));
router.put("/:id", tryCatch(controller.updateUser));
router.delete("/:id", tryCatch(controller.deleteUser));
router.post("/login", tryCatch(controller.loginUser));

export default router;