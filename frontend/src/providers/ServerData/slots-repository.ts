import { CreateSlot, Slot, SlotsApi } from 'coliving-erp-api-client';

export class SlotsRepository {
  constructor(private readonly api: SlotsApi) {

  }

  async list(): Promise<Slot[]> {
    const response = await this.api.listSlots();
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async get(id: number): Promise<Slot> {
    throw new Error('not implemented');
  }

  async create(data: CreateSlot): Promise<Slot> {
    const response = await this.api.createSlot(data);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async remove(id: number): Promise<void> {
    throw new Error('not implemented');
  }
}
