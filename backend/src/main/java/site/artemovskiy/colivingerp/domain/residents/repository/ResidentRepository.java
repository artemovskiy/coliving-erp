package site.artemovskiy.colivingerp.domain.residents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.domain.residents.model.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
}
