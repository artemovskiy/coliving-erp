import {
  CreateRoom, House, Room, RoomsApi,
} from 'coliving-erp-api-client';

export class RoomsRepository {
  constructor(private readonly api: RoomsApi) {

  }

  async list(): Promise<Room[]> {
    const response = await this.api.listRooms();
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async get(id: number): Promise<House> {
    throw new Error('not implemented');
  }

  async create(data: CreateRoom): Promise<House> {
    const response = await this.api.createRoom(data);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async remove(id: number): Promise<void> {
    throw new Error('not implemented');
  }
}
