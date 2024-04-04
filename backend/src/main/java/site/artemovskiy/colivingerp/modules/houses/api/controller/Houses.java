package site.artemovskiy.colivingerp.modules.houses.api.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.modules.houses.api.dto.CreateHouse;
import site.artemovskiy.colivingerp.modules.houses.api.dto.HouseDto;
import site.artemovskiy.colivingerp.modules.houses.api.mappers.HouseMapper;
import site.artemovskiy.colivingerp.modules.houses.model.House;
import site.artemovskiy.colivingerp.modules.houses.repository.HouseRepository;
import site.artemovskiy.colivingerp.sandbox.AuthenticatedHttpRequest;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "/house")
public class Houses {
    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private HouseMapper houseMapper;

    @Autowired
    private HttpServletRequest request;

    @GetMapping
    public ResponseEntity<Collection<HouseDto>> listHouses() {
        if(request.getUserPrincipal() == null) {
            return ResponseEntity.badRequest().build();
        }
        System.out.printf("principal = %s%n", (request).getUserPrincipal().getName());
        Collection<House> houses = houseRepository.findAll();
        return ResponseEntity.ok(houseMapper.modelCollectionToDTOs(houses));
    }

    @PostMapping
    public ResponseEntity<House> createHouse(@RequestBody CreateHouse body) {
        House house = new House();
        house.setName(body.name);
        houseRepository.save(house);

        return ResponseEntity.ok(house);
    }

    @GetMapping("{id}")
    public ResponseEntity<HouseDto> get(@PathVariable int id) {
        Optional<House> house = houseRepository.findById(id);
        return house.map(houseMapper::modelToHouseDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
}
