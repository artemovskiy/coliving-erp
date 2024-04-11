package site.artemovskiy.colivingerp.modules.accommodations.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.modules.accommodations.entity.Accommodation;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
}
