package site.artemovskiy.colivingerp.domain.core.api.mappers;

import org.mapstruct.Mapper;
import site.artemovskiy.colivingerp.domain.core.api.dto.HouseDto;
import site.artemovskiy.colivingerp.domain.core.model.House;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface HouseMapper {
    HouseDto modelToHouseDto(site.artemovskiy.colivingerp.domain.core.model.House model);

    List<HouseDto> modelCollectionToDTOs(Collection<House> houses);
}
