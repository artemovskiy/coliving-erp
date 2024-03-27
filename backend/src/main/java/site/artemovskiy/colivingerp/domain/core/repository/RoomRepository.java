package site.artemovskiy.colivingerp.domain.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.domain.core.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
