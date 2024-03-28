package site.artemovskiy.colivingerp.domain.residents.api.mappers;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.domain.core.model.House;
import site.artemovskiy.colivingerp.domain.core.model.Room;
import site.artemovskiy.colivingerp.domain.core.model.Slot;
import site.artemovskiy.colivingerp.domain.residents.api.dto.AccommodationDto;
import site.artemovskiy.colivingerp.domain.residents.api.dto.HouseDto;
import site.artemovskiy.colivingerp.domain.residents.api.dto.RoomDto;
import site.artemovskiy.colivingerp.domain.residents.api.dto.SlotDto;
import site.artemovskiy.colivingerp.domain.residents.model.Accommodation;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ChessplateMapper {

    HouseDto houseToHouseDto(House house);

    List<HouseDto> houseCollectionToDTOs(Collection<House> collection);

    RoomDto roomToRoomDto(Room room);

    List<RoomDto> roomCollectionToDTOs(Collection<Room> collection);

    SlotDto slotToDto(Slot slot);

    List<SlotDto> slotCollectionToDTOs(Collection<Slot> collection);

    AccommodationDto accommodationToDto(Accommodation entity);

    List<AccommodationDto> accommodationCollectionToDTOs(Collection<Accommodation> collection);
}
