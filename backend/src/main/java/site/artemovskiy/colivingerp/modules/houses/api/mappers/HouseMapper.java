package site.artemovskiy.colivingerp.modules.houses.api.mappers;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.modules.houses.api.dto.HouseDto;
import site.artemovskiy.colivingerp.modules.houses.model.House;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface HouseMapper {
    HouseDto modelToHouseDto(site.artemovskiy.colivingerp.modules.houses.model.House model);

    List<HouseDto> modelCollectionToDTOs(Collection<House> houses);
}
