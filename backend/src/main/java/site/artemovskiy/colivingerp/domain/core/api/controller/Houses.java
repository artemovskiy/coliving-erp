package site.artemovskiy.colivingerp.domain.core.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.domain.core.api.dto.CreateHouse;
import site.artemovskiy.colivingerp.domain.core.model.House;
import site.artemovskiy.colivingerp.domain.core.repository.HouseRepository;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "/house")
public class Houses {
    @Autowired
    private HouseRepository houseRepository;

    @GetMapping
    public ResponseEntity<Collection<House>> listHouses() {
        Collection<House> houses = houseRepository.findAll();

        return ResponseEntity.ok(houses);
    }

    @PostMapping
    public ResponseEntity<House> createHouse(@RequestBody CreateHouse body) {
        House house = new House();
        house.setName(body.name);
        houseRepository.save(house);

        return ResponseEntity.ok(house);
    }

    @GetMapping("{id}")
    public ResponseEntity<House> get(@PathVariable int id) {
        Optional<House> house = houseRepository.findById(id);
        return house.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
}
