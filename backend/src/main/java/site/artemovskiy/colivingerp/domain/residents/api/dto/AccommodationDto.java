package site.artemovskiy.colivingerp.domain.residents.api.dto;

import site.artemovskiy.colivingerp.domain.residents.model.Resident;

import java.time.LocalDate;

public class AccommodationDto {

    public int id;

    public LocalDate start;
    public LocalDate endDate;

    public Resident resident;

}
