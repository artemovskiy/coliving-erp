package site.artemovskiy.colivingerp.modules.reports.excpectedearn.api.mapper;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.api.dto.MonthExpectedEarnReportRowDto;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.dto.MonthExpectedEarn;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public abstract class ExpectedEarnReportMapper {

    public MonthExpectedEarnReportRowDto monthExpectedEarnToReportRow(MonthExpectedEarn entity) {
        MonthExpectedEarnReportRowDto row = new MonthExpectedEarnReportRowDto();
        row.monthStart = entity.getMonthStart();
        row.value = BigDecimal.valueOf(entity.getValue()).movePointLeft(2).toString();
        return row;
    }
}
