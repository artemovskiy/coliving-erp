package site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto;

import site.artemovskiy.colivingerp.common.time.DateSpan;
import site.artemovskiy.colivingerp.common.time.DateUtil;

import java.time.LocalDate;
import java.util.List;

public class HeaderDto {

    public LocalDate yearStart;
    public LocalDate start;

    public List<HeaderMonthDto> months;

    public static HeaderDto fromStart(LocalDate start) {
        LocalDate end = DateUtil.endOfYear(start);

        HeaderDto header = new HeaderDto();
        header.start = start;
        header.yearStart = start.withDayOfYear(1);
        header.months = DateSpan.of(start, end).listMonthStarts().stream().map(i -> {
            if (i.isBefore(start)) {
                return HeaderMonthDto.fromStart(start);
            }
            return HeaderMonthDto.fromStart(i);
        }).toList();
        return header;
    }

    public static HeaderDto fromDateSpan(DateSpan span) {
        HeaderDto header = new HeaderDto();
        header.start = span.getStart();
        header.yearStart = header.start.withDayOfYear(1);
        header.months = span.listMonthStarts().stream().map(i -> {
            LocalDate start = DateUtil.max(i, span.getStart());
            LocalDate end = DateUtil.min(DateUtil.endOfMonth(i), span.getEnd());
            return HeaderMonthDto.fromDateSpan(DateSpan.of(start, end));
        }).toList();
        return header;
    }
}
