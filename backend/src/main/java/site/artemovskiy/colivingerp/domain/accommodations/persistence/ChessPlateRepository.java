package site.artemovskiy.colivingerp.domain.accommodations.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import site.artemovskiy.colivingerp.domain.accommodations.domain.chessplate.ChessPlateParams;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class ChessPlateRepository {

    @PersistenceContext
    private EntityManager entityManager;

    private static Date toDate(LocalDate localDate) {
        ZoneId defaultZoneId = ZoneId.systemDefault();

        //creating the instance of LocalDate using the day, month, year info

        //local date + atStartOfDay() + default time zone + toInstant() = Date
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        return date;
    }

    public List<QueryResultRow> getChessPlateData(ChessPlateParams params) {
        Query query = entityManager.createNativeQuery("select " +
                "h.id as houseId, h.name as houseName, " +
                "r.id as roomId, r.name as roomName, " +
                "s.id as slotId, s.label as slotLabel, " +
                "a.id as accommodationId, a.start as startDate, a,end_date as endDate, " +
                "res.id as residentId, res.first_name as residentFirstName, res.birthday as residentBirthDate " +
                "from houses h \n" +
                "left join rooms r on r.house_id = h.id \n" +
                "left join slot s on s.room_id = r.id\n" +
                "left join accommodations a on a.slot_id = s.id and \"start\" <= :periodEnd and end_date >= :periodStart\n" +
                "left join residents res on res.id = a.resident_id \n" +
                "where h.id in :houseList\n" +
                "order by h.id, r.id, s.id, a.\"start\" ", "AccommodationsChessPlateMapper");
        query.setParameter("houseList", params.getHouses());
        query.setParameter("periodStart", toDate(params.getStart()));
        query.setParameter("periodEnd", toDate(params.getEnd()));
        List<QueryResultRow> result = (List<QueryResultRow>) query.getResultList();


        return result;
    }
}
