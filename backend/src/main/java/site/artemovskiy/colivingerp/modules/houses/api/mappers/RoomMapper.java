package site.artemovskiy.colivingerp.modules.houses.api.mappers;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.modules.houses.api.dto.RoomDto;
import site.artemovskiy.colivingerp.modules.houses.model.Room;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", uses = HouseMapper.class)
public interface RoomMapper {
    RoomDto roomEntityToDTO(Room entity);

    List<RoomDto> roomEntityCollectionToDTOs(Collection<Room> collection);
}
