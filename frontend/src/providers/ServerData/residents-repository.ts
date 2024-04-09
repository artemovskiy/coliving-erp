import { ResidentControllerApi, Resident, CreateResident } from 'coliving-erp-api-client';

export class ResidentsRepository {
  constructor(private readonly api: ResidentControllerApi) {

  }

  async list(): Promise<Resident[]> {
    const response = await this.api.listResidents();
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async get(id: number): Promise<Resident> {
    throw new Error('not implemented');
  }

  async create(data: CreateResident): Promise<Resident> {
    const response = await this.api.createResident(data);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async remove(id: number): Promise<void> {
    throw new Error('not implemented');
  }
}
