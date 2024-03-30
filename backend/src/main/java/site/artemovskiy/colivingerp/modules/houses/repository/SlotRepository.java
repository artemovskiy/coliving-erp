package site.artemovskiy.colivingerp.modules.houses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.modules.houses.model.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {
}
