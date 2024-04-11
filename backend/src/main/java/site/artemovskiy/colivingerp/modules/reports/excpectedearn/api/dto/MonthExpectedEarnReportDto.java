package site.artemovskiy.colivingerp.modules.reports.excpectedearn.api.dto;

import java.util.List;

public class MonthExpectedEarnReportDto {

    public List<MonthExpectedEarnReportRowDto> rows;

    public int monthsCount;

    public String average;
}
