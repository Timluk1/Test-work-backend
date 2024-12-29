import { statusRepository } from "../../database/repositories";
import { NotFoundError, ValidationError } from "../../lib/appError";
import { isValidUUID } from "../../validation/checkUuid";

export class StatusService {
    public async getAllStatuses() {
        return await statusRepository.getAllStatuses();
    }

    public async getStatusById(id: string) {
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new ValidationError("Invalid status id");
        }

        const status = await statusRepository.getStatusById(id);

        if (!status) {
            throw new NotFoundError("Status not found");
        }

        return status;
    }

    public async createStatus(name: string) {
        if (!name) {
            throw new ValidationError("Name is required");
        }

        return await statusRepository.createStatus(name);
    }

    // Обновление статуса
    public async updateStatus(id: string, name: string) {
        // Проверка на корректность UUID
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new ValidationError("Invalid status id");
        }
        if (!name) {
            throw new ValidationError("Name is required");
        }

        const updatedStatus = await statusRepository.updateStatus(id, name);

        if (!updatedStatus) {
            throw new NotFoundError("Status not found");
        }

        return updatedStatus;
    }

    public async deleteStatus(id: string) {
        // Проверка на корректность UUID
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new ValidationError("Invalid status id");
        }

        const isDeleted = await statusRepository.deleteStatus(id);

        if (!isDeleted) {
            throw new NotFoundError("Status not found");
        }

        return isDeleted;
    }
}

export const statusService = new StatusService();
