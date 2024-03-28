package site.artemovskiy.colivingerp.domain.residents.api.controller;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.artemovskiy.colivingerp.common.time.DateSpan;
import site.artemovskiy.colivingerp.common.time.DateUtil;
import site.artemovskiy.colivingerp.domain.core.model.House;
import site.artemovskiy.colivingerp.domain.residents.api.dto.ChessPlateDto;
import site.artemovskiy.colivingerp.domain.residents.api.dto.HeaderDto;
import site.artemovskiy.colivingerp.domain.residents.api.mappers.ChessplateMapper;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "accommodations-chess-plate")
public class ChessPlateController {
    @Autowired
    private ChessplateMapper chessplateMapper;

    @PersistenceContext
    private EntityManager entityManager;

    private static Date toDate(LocalDate localDate) {
        ZoneId defaultZoneId = ZoneId.systemDefault();

        //creating the instance of LocalDate using the day, month, year info

        //local date + atStartOfDay() + default time zone + toInstant() = Date
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        return date;
    }

    @GetMapping
    @Transactional
    public ResponseEntity<ChessPlateDto> get(
            @RequestParam(name = "start-date") LocalDate startDate,
            @RequestParam(name = "end-date") LocalDate endDate,
            @RequestParam(name = "house-id") List<Integer> houseIds
    ) {
//            Query query = entityManager.createNativeQuery("select h.* from houses h \n" +
//                    "\tleft join rooms r on r.house_id = h.id \n" +
//                    "\tleft join slot s on s.room_id = r.id\n" +
//                    "\tleft join accommodations a on a.slot_id = s.id and \"start\" <= :periodEnd and end_date >= :periodStart\n" +
//                    "\tleft join residents res on res.id = a.resident_id \n" +
//                    "where h.id in :houseList\n" +
//                    "order by h.id, r.id, s.id, a.\"start\"
//            ", House.class);
        Query query = entityManager.createQuery(
                "SELECT h FROM House h LEFT JOIN FETCH h.rooms r LEFT JOIN FETCH r.slots s "
                        + "LEFT JOIN FETCH s.accommodations a LEFT JOIN FETCH a.resident "
                        + " WHERE h.id IN :houseList AND (a.start is null or a.start <= :periodEnd) "
                        + " AND (a.start is null or a.start <= :periodEnd) and (a.endDate is null or a.endDate >= :periodStart) "
                        + "ORDER BY h.id ASC, r.id ASC, s.id ASC, a.id ASC"
        );
        query.setParameter("houseList", houseIds);
        query.setParameter("periodStart", toDate(startDate));
        query.setParameter("periodEnd", toDate(endDate));
        List<House> result = (List<House>) query.getResultList();

        var res = new ChessPlateDto();
        res.houses = chessplateMapper.houseCollectionToDTOs(result);
        res.headers = DateSpan.of(startDate, endDate).listYearStarts().stream()
                .map(i -> {
                    LocalDate start = DateUtil.max(i, startDate);
                    LocalDate end = DateUtil.min(DateUtil.endOfYear(i), endDate);
                    return HeaderDto.fromDateSpan(DateSpan.of(start, end));
                })
                .toList();
        return ResponseEntity.ok(res);
    }
}
