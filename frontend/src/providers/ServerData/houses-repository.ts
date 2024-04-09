import { CreateHouse, House, HousesApi } from 'coliving-erp-api-client';

export class HousesRepository {
  constructor(private readonly api: HousesApi) {

  }

  async list(): Promise<House[]> {
    const response = await this.api.listHouses();
    return response.data;
  }

  async get(id: number): Promise<House> {
    const response = await this.api.get1(id);
    return response.data;
  }

  async create(data: CreateHouse): Promise<House> {
    const response = await this.api.createHouse(data);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async remove(id: number): Promise<void> {
    throw new Error('not implemented');
  }
}
