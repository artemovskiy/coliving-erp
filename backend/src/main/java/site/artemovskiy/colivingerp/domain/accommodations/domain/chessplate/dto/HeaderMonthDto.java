package site.artemovskiy.colivingerp.domain.accommodations.domain.chessplate.dto;

import site.artemovskiy.colivingerp.common.time.DateSpan;

import java.time.LocalDate;
import java.util.List;

public class HeaderMonthDto {

    public LocalDate firstDay;

    public List<LocalDate> days;

    public static HeaderMonthDto fromStart(LocalDate start) {
        LocalDate end = start.plusDays(start.lengthOfMonth());

        HeaderMonthDto header = new HeaderMonthDto();
        header.firstDay = start.withDayOfMonth(1);
        header.days = DateSpan.of(start, end).listDays();
        return header;
    }

    public static HeaderMonthDto fromDateSpan(DateSpan span) {
        LocalDate monthEnd = span.getStart().plusDays(span.getStart().lengthOfMonth());

        HeaderMonthDto header = new HeaderMonthDto();
        header.firstDay = span.getStart().withDayOfMonth(1);
        header.days = span.listDays();
        return header;
    }

}
