package site.artemovskiy.colivingerp.modules.houses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.artemovskiy.colivingerp.modules.houses.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
