import {
  AccommodationControllerApi, AccommodationDto, ChessPlateControllerApi, ChessPlateDto, CreateAccommodation,
  PatchAccommodationDto,
} from 'coliving-erp-api-client';
import { format } from 'date-fns';

export class AccommodationsRepository {
  constructor(
    private readonly api: AccommodationControllerApi,
    private readonly chessPlateApi: ChessPlateControllerApi,
  ) {

  }

  async patch(id: number, patch: PatchAccommodationDto): Promise<AccommodationDto> {
    const response = await this.api.patchAccommodation(id, patch);
    return response.data;
  }

  async list(): Promise<AccommodationDto[]> {
    const response = await this.api.listAccommodations();
    return response.data;
  }

  async get(id: number): Promise<AccommodationDto> {
    const response = await this.api.get3(id);
    return response.data;
  }

  async create(data: CreateAccommodation): Promise<AccommodationDto> {
    const response = await this.api.createAccommodation(data);
    return response.data;
  }

  async remove(id: number): Promise<void> {
    await this.api.deleteAccommodation(id);
  }

  async getChessPlate({ start, end, houseId }: ChessPlateRequest): Promise<ChessPlateDto> {
    const response = await this.chessPlateApi.get2(
      format(start, 'yyyy-MM-dd'),
      format(end, 'yyyy-MM-dd'),
      houseId,
    );

    return response.data;
  }
}

export interface ChessPlateRequest {
  houseId: number[];
  start: Date;
  end: Date;
}
