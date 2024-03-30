package site.artemovskiy.colivingerp.modules.residents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.modules.residents.model.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
}
