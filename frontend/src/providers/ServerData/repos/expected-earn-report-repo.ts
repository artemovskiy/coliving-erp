import {
  ExpectedEarnReportControllerApi,
  MonthExpectedEarnReportDto,
} from 'coliving-erp-api-client';
import { format } from 'date-fns';

export interface ExpectedEarnReportRequest {
  start: Date;
  end: Date;
  houseId?: number;
}

export class ExpectedEarnReportRepo {
  constructor(
    private readonly api: ExpectedEarnReportControllerApi,
  ) {

  }

  async getByMonthReport({ start, end, houseId }: ExpectedEarnReportRequest): Promise<MonthExpectedEarnReportDto> {
    const response = await this.api.getBeMonth(
      format(start, 'yyyy-MM-dd'),
      format(end, 'yyyy-MM-dd'),
      houseId,
    );
    return response.data;
  }
}
