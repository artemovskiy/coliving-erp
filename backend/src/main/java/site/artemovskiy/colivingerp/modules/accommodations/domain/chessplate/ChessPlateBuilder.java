package site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate;

import site.artemovskiy.colivingerp.common.time.DateSpan;
import site.artemovskiy.colivingerp.common.time.DateUtil;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto.*;
import site.artemovskiy.colivingerp.modules.accommodations.persistence.ChessPlateRepository;
import site.artemovskiy.colivingerp.modules.accommodations.persistence.HouseUtilizationQueryResultRow;
import site.artemovskiy.colivingerp.modules.accommodations.persistence.QueryResultRow;
import site.artemovskiy.colivingerp.modules.residents.model.Resident;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ChessPlateBuilder {

    private final ChessPlateRepository chessPlateRepository;
    private ChessPlateParams params;
    private ChessPlateDto data;

    public ChessPlateBuilder(ChessPlateRepository repository) {
        this.chessPlateRepository = repository;
        data = new ChessPlateDto();
    }

    public ChessPlateParams getParams() {
        return params;
    }

    public void setParams(ChessPlateParams params) {
        this.params = params;
    }

    public ChessPlateDto get() {
        return data;
    }

    protected void reset() {
        data = new ChessPlateDto();
    }

    public void createHeaders() {
        data.headers = DateSpan.of(params.getStart(), params.getEnd())
                .listYearStarts().stream()
                .map(i -> {
                    LocalDate start = DateUtil.max(i, params.getStart());
                    LocalDate end = DateUtil.min(DateUtil.endOfYear(i), params.getEnd());
                    return HeaderDto.fromDateSpan(DateSpan.of(start, end));
                })
                .toList();
    }

    public void loadAccommodations() {
        List<QueryResultRow> rows = chessPlateRepository.getChessPlateData(params);

        data.houses = rows.stream()
                .collect(Collectors.groupingBy(QueryResultRow::getHouseId))
                .entrySet()
                .stream()
                .map((Map.Entry<Long, List<QueryResultRow>> i) -> {
                    var house = new HouseDto();
                    house.id = i.getKey().intValue();
                    house.name = i.getValue().getFirst().houseName;
                    house.rooms = i.getValue().stream()
                            .collect(Collectors.groupingBy(QueryResultRow::getRoomId))
                            .entrySet()
                            .stream()
                            .map((Map.Entry<Long, List<QueryResultRow>> rEntry) -> {
                                var room = new RoomDto();
                                room.id = rEntry.getKey().intValue();
                                room.name = rEntry.getValue().getFirst().roomName;
                                room.slots = rEntry.getValue().stream()
                                        .collect(Collectors.groupingBy(QueryResultRow::getSlotId))
                                        .entrySet()
                                        .stream()
                                        .map((Map.Entry<Long, List<QueryResultRow>> sEntry) -> {
                                            var slot = new SlotDto();
                                            slot.id = sEntry.getKey().intValue();
                                            slot.label = (sEntry.getValue().getFirst().slotLabel);
                                            slot.accommodations = sEntry.getValue().stream().map(a -> {
                                                        if (a.getAccommodationId() == null) {
                                                            return null;
                                                        }
                                                        var accommodation = new AccommodationDto();
                                                        accommodation.id = a.getAccommodationId().intValue();
                                                        accommodation.start = a.startDate;
                                                        accommodation.endDate = a.endDate;
                                                        accommodation.resident = new Resident(a.getResidentId());
                                                        accommodation.resident.setFirstName(a.residentFirstName);
                                                        accommodation.resident.setBirthday(a.residentBirthDate);
                                                        return accommodation;
                                                    })
                                                    .filter(Objects::nonNull)
                                                    .collect(Collectors.toList());

                                            return slot;
                                        })
                                        .collect(Collectors.toList());
                                return room;
                            })
                            .collect(Collectors.toList());
                    return house;
                })
                .toList();
    }

    public void loadUtilization() {
        List<HouseUtilizationQueryResultRow> rows = chessPlateRepository.getHouseUtilization(params);

        data.headers.forEach(header -> {
            header.months.forEach(monthHeader -> {
                Stream<HouseUtilizationQueryResultRow> filteredStream = rows.stream()
                        .filter(u -> u.monthStart.equals(monthHeader.firstDay));
                monthHeader.utilization = filteredStream
                        .map(u -> {
                            HeaderUtilization headerUtilization = new HeaderUtilization();
                            headerUtilization.houseId = u.houseId;
                            headerUtilization.value = u.utilization;
                            return headerUtilization;
                        })
                        .toList();
            });
        });

    }
}
