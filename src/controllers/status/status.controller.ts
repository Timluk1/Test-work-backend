import { Request, Response, NextFunction } from "express";
import { statusService } from "../../services/status/status.service";
import { logger } from "../../lib/logger";

class StatusController {
    public async getAllStatuses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const statuses = await statusService.getAllStatuses();
            res.status(200).json(statuses);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async getStatusById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const status = await statusService.getStatusById(id);
            res.status(200).json(status);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async createStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name } = req.body;
            const status = await statusService.createStatus(name);
            res.status(201).json(status);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedStatus = await statusService.updateStatus(id, name);
            res.status(200).json(updatedStatus);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async deleteStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await statusService.deleteStatus(id);
            res.status(204).send();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}

export const statusController = new StatusController();
