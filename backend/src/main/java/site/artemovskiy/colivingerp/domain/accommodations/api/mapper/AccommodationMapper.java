package site.artemovskiy.colivingerp.domain.accommodations.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import site.artemovskiy.colivingerp.domain.accommodations.api.dto.AccommodationDto;
import site.artemovskiy.colivingerp.domain.accommodations.api.dto.AccommodationResidentDto;
import site.artemovskiy.colivingerp.domain.accommodations.api.dto.AccommodationSlotDto;
import site.artemovskiy.colivingerp.domain.accommodations.api.dto.AccommodationSlotRoomDto;
import site.artemovskiy.colivingerp.domain.core.model.Room;
import site.artemovskiy.colivingerp.domain.core.model.Slot;
import site.artemovskiy.colivingerp.domain.residents.model.Accommodation;
import site.artemovskiy.colivingerp.domain.residents.model.Resident;

@Mapper(componentModel = "spring")
public interface AccommodationMapper {

    @Mapping(source = "entity.start", target = "startDate")
    AccommodationDto accommodationEntityToDTO(Accommodation entity);

    AccommodationSlotDto slotToDTO(Slot entity);

    AccommodationSlotRoomDto roomToDTO(Room entity);

    AccommodationResidentDto residentToDTO(Resident entity);
}
