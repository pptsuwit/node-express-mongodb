import express from "express";
import { authorize } from "@middlewares/authorize";
import { create, deleteById, exportExcel, exportPDF, getAll, getById, update } from "@controllers/customer.controller";
const router = express.Router();

router.get("/customer-export-excel", exportExcel);
router.get("/customer-export-pdf", exportPDF);
router.get("/customer", authorize, getAll);
router.get("/customer/:id", authorize, getById);

router.post("/customer", authorize, create);
router.put("/customer", authorize, update);
router.delete("/customer/:id", authorize, deleteById);

export default router;
