package site.artemovskiy.colivingerp.modules.houses.api.mappers;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.modules.houses.api.dto.SlotDto;
import site.artemovskiy.colivingerp.modules.houses.model.Slot;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", uses = RoomMapper.class)
public interface SlotMapper {


    SlotDto slotEntityToDTO(Slot entity);

    List<SlotDto> slotEntityCollectionToDTOs(Collection<Slot> collection);

}
