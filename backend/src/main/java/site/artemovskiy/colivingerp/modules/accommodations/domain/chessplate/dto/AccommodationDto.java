package site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto;

import site.artemovskiy.colivingerp.modules.residents.model.Resident;

import java.time.LocalDate;

public class AccommodationDto {

    public int id;

    public LocalDate start;
    public LocalDate endDate;

    public Resident resident;

}
