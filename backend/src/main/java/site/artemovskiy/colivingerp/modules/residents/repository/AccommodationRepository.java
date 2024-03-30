package site.artemovskiy.colivingerp.modules.residents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.modules.residents.model.Accommodation;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
}
