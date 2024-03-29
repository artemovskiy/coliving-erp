package site.artemovskiy.colivingerp.domain.accommodations.api.dto;

import java.time.LocalDate;

public class CreateAccommodation {

    public Long slotId;

    public Long residentId;

    public LocalDate start;

    public LocalDate end;
}
