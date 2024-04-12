package site.artemovskiy.colivingerp.modules.residents.api.mappers;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto.AccommodationDto;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto.HouseDto;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto.RoomDto;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto.SlotDto;
import site.artemovskiy.colivingerp.modules.accommodations.entity.Accommodation;
import site.artemovskiy.colivingerp.modules.houses.model.House;
import site.artemovskiy.colivingerp.modules.houses.model.Room;
import site.artemovskiy.colivingerp.modules.houses.model.Slot;

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
