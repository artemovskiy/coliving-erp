package site.artemovskiy.colivingerp.modules.accommodations.api.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.AccommodationDto;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.CreateAccommodation;
import site.artemovskiy.colivingerp.modules.accommodations.api.dto.PatchAccommodationDto;
import site.artemovskiy.colivingerp.modules.accommodations.api.mapper.AccommodationMapper;
import site.artemovskiy.colivingerp.modules.houses.model.Slot;
import site.artemovskiy.colivingerp.modules.houses.repository.SlotRepository;
import site.artemovskiy.colivingerp.modules.accommodations.entity.Accommodation;
import site.artemovskiy.colivingerp.modules.residents.model.Resident;
import site.artemovskiy.colivingerp.modules.accommodations.persistence.AccommodationRepository;
import site.artemovskiy.colivingerp.modules.residents.repository.ResidentRepository;

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

    @Autowired
    private AccommodationMapper accommodationMapper;

    @GetMapping
    public ResponseEntity<Collection<AccommodationDto>> listAccommodations() {
        Collection<Accommodation> accommodations = accommodationRepository.findAll();

        return ResponseEntity.ok(accommodations.stream().map(i -> accommodationMapper.accommodationEntityToDTO(i)).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccommodationDto> get(@PathVariable(name = "id") Long id) {
        Optional<Accommodation> accommodation = accommodationRepository.findById(id);
        return accommodation.map(value -> ResponseEntity.ok(accommodationMapper.accommodationEntityToDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<AccommodationDto> createAccommodation(@RequestBody CreateAccommodation body) {
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
        accommodation.setMonthlyPrice((int) Math.round(body.monthlyPrice * 100));
        accommodationRepository.save(accommodation);

        return ResponseEntity.ok(accommodationMapper.accommodationEntityToDTO(accommodation));
    }

    @PatchMapping("{id}")
    @Transactional
    public ResponseEntity<AccommodationDto> patchAccommodation(@PathVariable(name = "id") Long id, @RequestBody PatchAccommodationDto body) {
        Optional<Accommodation> accommodation = accommodationRepository.findById(id);
        if (accommodation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Accommodation entity = accommodation.get();
        entity.setStart(body.startDate);
        entity.setEndDate(body.endDate);
        entity.setMonthlyPrice((int) Math.round(body.monthlyPrice * 100));
        accommodationRepository.save(entity);

        return ResponseEntity.ok(accommodationMapper.accommodationEntityToDTO(entity));
    }

    @DeleteMapping("{id}")
    @Transactional
    public ResponseEntity deleteAccommodation(@PathVariable(name = "id") Long id) {
        Optional<Accommodation> accommodation = accommodationRepository.findById(id);
        if (accommodation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        accommodationRepository.delete(accommodation.get());
        return ResponseEntity.noContent().build();
    }
}
