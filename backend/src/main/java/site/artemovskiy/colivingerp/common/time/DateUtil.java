package site.artemovskiy.colivingerp.common.time;

import java.time.LocalDate;

public class DateUtil {

    public static LocalDate endOfYear(LocalDate date) {
        return date.plusYears(1).withDayOfYear(1).minusDays(1);
    }

    public static LocalDate endOfMonth(LocalDate date) {
        return date.plusMonths(1).withDayOfMonth(1).minusDays(1);
    }

    public static LocalDate max(LocalDate a, LocalDate b) {
        if (b.isAfter(a)) {
            return b;
        }
        return a;
    }

    public static LocalDate min(LocalDate a, LocalDate b) {
        if (b.isBefore(a)) {
            return b;
        }
        return a;
    }
}
