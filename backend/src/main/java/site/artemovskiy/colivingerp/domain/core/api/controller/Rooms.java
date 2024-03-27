package site.artemovskiy.colivingerp.domain.core.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.domain.core.api.dto.CreateRoom;
import site.artemovskiy.colivingerp.domain.core.model.House;
import site.artemovskiy.colivingerp.domain.core.model.Room;
import site.artemovskiy.colivingerp.domain.core.repository.HouseRepository;
import site.artemovskiy.colivingerp.domain.core.repository.RoomRepository;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "/room")
public class Rooms {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HouseRepository houseRepository;

    @GetMapping
    public ResponseEntity<Collection<Room>> listRooms() {
        Collection<Room> rooms = roomRepository.findAll();

        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody CreateRoom body) {
        Optional<House> house = houseRepository.findById(body.houseId);
        if (house.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Room room = new Room();
        room.setName(body.name);
        room.setHouse(house.get());
        roomRepository.save(room);

        return ResponseEntity.ok(room);
    }
}
