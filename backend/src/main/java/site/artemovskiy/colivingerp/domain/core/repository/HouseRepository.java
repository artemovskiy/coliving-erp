package site.artemovskiy.colivingerp.domain.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.domain.core.model.House;

public interface HouseRepository extends JpaRepository<House, Integer> {
}
