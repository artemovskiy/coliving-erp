package site.artemovskiy.colivingerp.domain.residents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.domain.residents.model.Accommodation;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
}
