package site.artemovskiy.colivingerp.modules.accommodations.api.mapper;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.AccommodationDto;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.AccommodationResidentDto;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.AccommodationSlotDto;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.AccommodationSlotRoomDto;
import site.artemovskiy.colivingerp.modules.accommodations.entity.Accommodation;
import site.artemovskiy.colivingerp.modules.houses.model.Room;
import site.artemovskiy.colivingerp.modules.houses.model.Slot;
import site.artemovskiy.colivingerp.modules.residents.model.Resident;

@Mapper(componentModel = "spring")
public interface AccommodationMapper {

    // @Mapping(source = "entity.start", target = "startDate")
    AccommodationDto accommodationEntityToDTO(Accommodation entity);

    AccommodationSlotDto slotToDTO(Slot entity);

    AccommodationSlotRoomDto roomToDTO(Room entity);

    AccommodationResidentDto residentToDTO(Resident entity);
}
