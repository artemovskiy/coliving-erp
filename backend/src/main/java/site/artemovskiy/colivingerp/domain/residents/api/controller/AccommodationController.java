package site.artemovskiy.colivingerp.domain.residents.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.domain.core.model.Slot;
import site.artemovskiy.colivingerp.domain.core.repository.SlotRepository;
import site.artemovskiy.colivingerp.domain.residents.api.dto.CreateAccommodation;
import site.artemovskiy.colivingerp.domain.residents.model.Accommodation;
import site.artemovskiy.colivingerp.domain.residents.model.Resident;
import site.artemovskiy.colivingerp.domain.residents.repository.AccommodationRepository;
import site.artemovskiy.colivingerp.domain.residents.repository.ResidentRepository;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(path = "accommodation")
public class AccommodationController {
    @Autowired
    private ResidentRepository residentRepository;
    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private AccommodationRepository accommodationRepository;

    @GetMapping
    public ResponseEntity<Collection<Accommodation>> listAccommodations() {
        Collection<Accommodation> accommodations = accommodationRepository.findAll();

        return ResponseEntity.ok(accommodations);
    }

    @PostMapping
    public ResponseEntity<Accommodation> createAccommodation(@RequestBody CreateAccommodation body) {
        Optional<Resident> resident = residentRepository.findById(body.residentId);
        if (resident.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        Optional<Slot> slot = slotRepository.findById(body.slotId);
        if (slot.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Accommodation accommodation = new Accommodation();
        accommodation.setResident(resident.get());
        accommodation.setSlot(slot.get());
        accommodation.setStart(body.start);
        accommodation.setEndDate(body.end);
        accommodationRepository.save(accommodation);

        return ResponseEntity.ok(accommodation);
    }
}