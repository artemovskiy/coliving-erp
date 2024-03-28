package site.artemovskiy.colivingerp.common.time;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DateSpan {

    private LocalDate start;
    private LocalDate end;

    public static DateSpan of(LocalDate start, LocalDate end) {
        if (start.isAfter(end)) {
            throw new RuntimeException("DateSpan start is after the end");
        }
        DateSpan i = new DateSpan();
        i.start = start;
        i.end = end;
        return i;
    }

    public LocalDate getStart() {
        return start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public List<LocalDate> listYearStarts() {
        List<LocalDate> yearStarts = new ArrayList<LocalDate>();
        LocalDate tmp = start.withDayOfYear(1);
        while (tmp.isBefore(end)) {
            yearStarts.add(tmp);
            tmp = tmp.plusYears(1);
        }

        return yearStarts;
    }


    public List<LocalDate> listMonthStarts() {
        List<LocalDate> monthStarts = new ArrayList<LocalDate>();
        LocalDate tmp = start;
        while (tmp.isBefore(end)) {
            monthStarts.add(tmp.withDayOfMonth(1));
            tmp = tmp.plusMonths(1);
        }

        return monthStarts;
    }


    public List<LocalDate> listDays() {
        List<LocalDate> monthStarts = new ArrayList<LocalDate>();
        LocalDate tmp = start;
        while (!tmp.isAfter(end)) {
            monthStarts.add(tmp);
            tmp = tmp.plusDays(1);
        }

        return monthStarts;
    }
}
