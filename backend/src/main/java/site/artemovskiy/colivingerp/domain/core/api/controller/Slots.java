package site.artemovskiy.colivingerp.domain.core.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.domain.core.api.dto.CreateSlot;
import site.artemovskiy.colivingerp.domain.core.model.Room;
import site.artemovskiy.colivingerp.domain.core.model.Slot;
import site.artemovskiy.colivingerp.domain.core.repository.RoomRepository;
import site.artemovskiy.colivingerp.domain.core.repository.SlotRepository;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "slots")
public class Slots {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping()
    public ResponseEntity<Collection<Slot>> listSlots() {
        Collection<Slot> slots = slotRepository.findAll();

        return ResponseEntity.ok(slots);
    }

    @PostMapping
    public ResponseEntity<Slot> createSlot(@RequestBody CreateSlot body) {
        Optional<Room> room = roomRepository.findById(body.roomId);
        if (room.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Slot slot = new Slot();
        slot.setLabel(body.label);
        slot.setRoom(room.get());
        slotRepository.save(slot);

        return ResponseEntity.ok(slot);
    }
}
