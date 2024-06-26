package site.artemovskiy.colivingerp.modules.accommodations.api.dto;

import java.time.LocalDate;

public class AccommodationDto {
    public Long id;

    public LocalDate startDate;

    public LocalDate endDate;

    public AccommodationResidentDto resident;

    public AccommodationSlotDto slot;

    public String monthlyPrice;
}
