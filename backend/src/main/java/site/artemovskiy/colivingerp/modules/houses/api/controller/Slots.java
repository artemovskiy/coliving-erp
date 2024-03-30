package site.artemovskiy.colivingerp.modules.houses.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.modules.houses.api.dto.CreateSlot;
import site.artemovskiy.colivingerp.modules.houses.api.dto.SlotDto;
import site.artemovskiy.colivingerp.modules.houses.api.mappers.SlotMapper;
import site.artemovskiy.colivingerp.modules.houses.model.Room;
import site.artemovskiy.colivingerp.modules.houses.model.Slot;
import site.artemovskiy.colivingerp.modules.houses.repository.RoomRepository;
import site.artemovskiy.colivingerp.modules.houses.repository.SlotRepository;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "slots")
public class Slots {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private SlotMapper slotMapper;

    @GetMapping()
    public ResponseEntity<Collection<SlotDto>> listSlots() {
        Collection<Slot> slots = slotRepository.findAll();

        return ResponseEntity.ok(slotMapper.slotEntityCollectionToDTOs(slots));
    }

    @PostMapping
    public ResponseEntity<SlotDto> createSlot(@RequestBody CreateSlot body) {
        Optional<Room> room = roomRepository.findById(body.roomId);
        if (room.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Slot slot = new Slot();
        slot.setLabel(body.label);
        slot.setRoom(room.get());
        slotRepository.save(slot);

        return ResponseEntity.ok(slotMapper.slotEntityToDTO(slot));
    }
}
