package site.artemovskiy.colivingerp.domain.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.domain.core.model.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {
}
