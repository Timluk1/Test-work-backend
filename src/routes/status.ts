import { Router } from "express";
import { statusController } from "../controllers/status/status.controller";

export const statusRouter = Router();

statusRouter.get("/status/", statusController.getAllStatuses);
statusRouter.get("/status/:id", statusController.getStatusById);
statusRouter.post("/status", statusController.createStatus);
statusRouter.put("/status/:id", statusController.updateStatus);
statusRouter.delete("/status/:id", statusController.deleteStatus);
