import express from "express";
import { authorize } from "@middlewares/authorize";
import { create, deleteById, getAll, getById, update } from "@controllers/user.controller";
const router = express.Router();

router.get("/user", authorize, getAll);
router.get("/user/:id", authorize, getById);

router.post("/user", authorize, create);
router.put("/user", authorize, update);
router.delete("/user/:id", authorize, deleteById);

export default router;
