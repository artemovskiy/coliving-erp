package site.artemovskiy.colivingerp.modules.reports.excpectedearn.dto;

import java.time.LocalDate;

public class MonthExpectedEarn {

    private LocalDate monthStart;

    private int value;

    public LocalDate getMonthStart() {
        return monthStart;
    }

    public void setMonthStart(LocalDate monthStart) {
        this.monthStart = monthStart;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
