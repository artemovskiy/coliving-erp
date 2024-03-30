package site.artemovskiy.colivingerp.modules.houses.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.modules.houses.api.dto.CreateRoom;
import site.artemovskiy.colivingerp.modules.houses.api.dto.RoomDto;
import site.artemovskiy.colivingerp.modules.houses.api.mappers.RoomMapper;
import site.artemovskiy.colivingerp.modules.houses.model.House;
import site.artemovskiy.colivingerp.modules.houses.model.Room;
import site.artemovskiy.colivingerp.modules.houses.repository.HouseRepository;
import site.artemovskiy.colivingerp.modules.houses.repository.RoomRepository;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "/room")
public class Rooms {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private RoomMapper roomMapper;

    @GetMapping
    public ResponseEntity<Collection<RoomDto>> listRooms() {
        Collection<Room> rooms = roomRepository.findAll();

        return ResponseEntity.ok(roomMapper.roomEntityCollectionToDTOs(rooms));
    }

    @PostMapping
    public ResponseEntity<RoomDto> createRoom(@RequestBody CreateRoom body) {
        Optional<House> house = houseRepository.findById(body.houseId);
        if (house.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Room room = new Room();
        room.setName(body.name);
        room.setHouse(house.get());
        roomRepository.save(room);

        return ResponseEntity.ok(roomMapper.roomEntityToDTO(room));
    }
}
