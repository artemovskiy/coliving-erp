package site.artemovskiy.colivingerp.modules.accommodations.domain.chessplate;

import java.time.LocalDate;
import java.util.List;

public class ChessPlateParams {

    private final LocalDate start;
    private final LocalDate end;

    private final List<Integer> houses;

    public ChessPlateParams(LocalDate start, LocalDate end, List<Integer> houses) {
        this.start = start;
        this.end = end;
        this.houses = houses;
    }

    public LocalDate getStart() {
        return start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public List<Integer> getHouses() {
        return houses;
    }
}
