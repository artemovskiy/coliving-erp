package site.artemovskiy.colivingerp.modules.residents.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.modules.residents.api.dto.CreateResident;
import site.artemovskiy.colivingerp.modules.residents.model.Resident;
import site.artemovskiy.colivingerp.modules.residents.repository.ResidentRepository;

import java.util.Collection;

@RestController
@RequestMapping(path = "resident")
public class ResidentController {
    @Autowired
    private ResidentRepository residentRepository;

    @GetMapping
    public ResponseEntity<Collection<Resident>> listResidents() {
        Collection<Resident> residents = residentRepository.findAll();

        return ResponseEntity.ok(residents);
    }

    @PostMapping
    public ResponseEntity<Resident> createResident(@RequestBody CreateResident body) {
        Resident resident = new Resident();
        resident.setFirstName(body.firstName);
        resident.setBirthday(body.birthday);
        residentRepository.save(resident);

        return ResponseEntity.ok(resident);
    }
}
