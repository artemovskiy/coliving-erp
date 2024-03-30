package site.artemovskiy.colivingerp.modules.houses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.modules.houses.model.House;

public interface HouseRepository extends JpaRepository<House, Integer> {
}
