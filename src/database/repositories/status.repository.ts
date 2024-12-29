import { Repository } from "typeorm";
import { Status } from "../entities";
import { AppDataSource } from "../init";

export class StatusRepository {
    private readonly statusRepository: Repository<Status> = AppDataSource.getRepository(Status);
    public async createStatus(name: string): Promise<Status> {
        const status = this.statusRepository.create({ name });
        return await this.statusRepository.save(status);
    }

    public async getStatusById(id: string): Promise<Status | null> {
        return await this.statusRepository.findOne({ where: { id } });
    }

    public async getAllStatuses(): Promise<Status[]> {
        return await this.statusRepository.find();
    }

    public async updateStatus(id: string, name: string): Promise<Status | null> {
        const status = await this.getStatusById(id);
        if (!status) return null;

        status.name = name;
        return await this.statusRepository.save(status);
    }

    public async deleteStatus(id: string): Promise<boolean> {
        const result = await this.statusRepository.delete({ id });
        return result.affected !== 0;
    }
}

export const statusRepository = new StatusRepository();