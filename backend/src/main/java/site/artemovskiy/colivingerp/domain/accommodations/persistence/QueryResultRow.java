package site.artemovskiy.colivingerp.domain.accommodations.persistence;

import java.time.LocalDate;


public class QueryResultRow {
    //
//    public Long id;
//    //    @Column(name = "houseId")
    public Long houseId;
    //    @JdbcTypeCode(SqlTypes.INTEGER)
    public String houseName;
    public Long roomId;
    public String roomName;
    public Long slotId;
    public String slotLabel;
    public Long accommodationId;
    //    @JdbcTypeCode(SqlTypes.INTEGER)
//    public int accommodationId;
//    //    @JdbcTypeCode(SqlTypes.VARCHAR)
//    public String residentName;
    public Long residentId;
    public LocalDate startDate;
    public LocalDate endDate;
    public String residentFirstName;
    public LocalDate residentBirthDate;
    public QueryResultRow() {

    }

    public Long getHouseId() {
        return houseId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getSlotId() {
        return slotId;
    }

    public Long getAccommodationId() {
        return accommodationId;
    }

    public Long getResidentId() {
        return residentId;
    }
}