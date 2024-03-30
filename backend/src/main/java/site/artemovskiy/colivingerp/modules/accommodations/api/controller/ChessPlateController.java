package site.artemovskiy.colivingerp.modules.accommodations.api.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.ChessPlateBuilder;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.ChessPlateParams;
import site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate.dto.ChessPlateDto;
import site.artemovskiy.colivingerp.modules.accommodations.persistence.ChessPlateRepository;
import site.artemovskiy.colivingerp.modules.residents.api.mappers.ChessplateMapper;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "accommodations-chess-plate")
public class ChessPlateController {
    @Autowired
    private ChessplateMapper chessplateMapper;

    @Autowired
    private ChessPlateRepository chessPlateRepository;

    @GetMapping
    @Transactional
    public ResponseEntity<ChessPlateDto> get(
            @RequestParam(name = "start-date") LocalDate startDate,
            @RequestParam(name = "end-date") LocalDate endDate,
            @RequestParam(name = "house-id") List<Integer> houseIds
    ) {
        var builder = new ChessPlateBuilder(chessPlateRepository);
        builder.setParams(new ChessPlateParams(startDate, endDate, houseIds));
        builder.loadAccommodations();
        builder.createHeaders();
        var res = builder.get();
        return ResponseEntity.ok(res);
    }
}
