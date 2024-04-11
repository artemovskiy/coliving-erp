package site.artemovskiy.colivingerp.modules.reports.excpectedearn.persistance;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import site.artemovskiy.colivingerp.common.time.DateSpan;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.dto.MonthExpectedEarn;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class ExpectedEarnReportDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<MonthExpectedEarn> getByMonth(DateSpan timeBorders) {
        Query query = entityManager.createNativeQuery("select " +
                "   month_start," +
                "   sum(\n" +
                "       round(\n" +
                "           ((least(a.end_date, month_end)\\:\\:date - greatest(month_start, a.\"start\")\\:\\:date)\\:\\:float\n" +
                "           / (month_end\\:\\:date - month_start\\:\\:date)) * a.monthly_price\n " +
                "       )\n" +
                "   )\n" +
                "from (" +
                "   select month_start, month_start + interval '1 month' as month_end\n" +
                "   from (" +
                "       select generate_series(:periodStart, :periodEnd, interval '1 month') as month_start" +
                "   ) as month_starts\n" +
                ") as month_borders\n" +
                "left join accommodations a on a.end_date >= month_start and a.\"start\" <= month_end\n" +
                "group by month_start\n" +
                "having month_start <> :periodEnd\n" +
                "order by month_start");
        query.setParameter("periodStart", timeBorders.getStart());
        query.setParameter("periodEnd", timeBorders.getEnd());
        List<Object[]> result = query.getResultList();

        return result.stream()
                .map(tuple -> {
                    MonthExpectedEarn element = new MonthExpectedEarn();
                    Instant localInstant = ((Instant) tuple[0]);
                    element.setMonthStart(LocalDate.ofInstant(localInstant, ZoneId.of("GMT+5")));
                    element.setValue(((Double) tuple[1]).intValue());
                    return element;
                })
                .toList();
    }

    public List<MonthExpectedEarn> getByMonthOfHouse(DateSpan timeBorders, int houseId) {
        Query query = entityManager.createNativeQuery("select " +
                "   month_start," +
                "   sum(\n" +
                "       round(\n" +
                "           ((least(a.end_date, month_end)\\:\\:date - greatest(month_start, a.\"start\")\\:\\:date)\\:\\:float\n" +
                "           / (month_end\\:\\:date - month_start\\:\\:date)) * a.monthly_price\n " +
                "       )\n" +
                "   )\n" +
                "from (" +
                "   select month_start, month_start + interval '1 month' as month_end\n" +
                "   from (" +
                "       select generate_series(:periodStart, :periodEnd, interval '1 month') as month_start" +
                "   ) as month_starts\n" +
                ") as month_borders\n" +
                "left join accommodations a on a.end_date >= month_start and a.\"start\" <= month_end\n" +
                "left join slot s on s.id = a.slot_id\n" +
                "left join rooms r on r.id = s.room_id\n" +
                "where r.house_id = :houseId\n" +
                "group by month_start\n" +
                "having month_start <> :periodEnd\n" +
                "order by month_start");
        query.setParameter("periodStart", timeBorders.getStart());
        query.setParameter("periodEnd", timeBorders.getEnd());
        query.setParameter("houseId", houseId);
        List<Object[]> result = query.getResultList();

        return result.stream()
                .map(tuple -> {
                    MonthExpectedEarn element = new MonthExpectedEarn();
                    Instant localInstant = ((Instant) tuple[0]);
                    element.setMonthStart(LocalDate.ofInstant(localInstant, ZoneId.of("GMT+5")));
                    element.setValue(((Double) tuple[1]).intValue());
                    return element;
                })
                .toList();
    }

}
