package site.artemovskiy.colivingerp.domain.residents.model;

import jakarta.persistence.*;
import site.artemovskiy.colivingerp.domain.accommodations.persistence.QueryResultRow;
import site.artemovskiy.colivingerp.domain.core.model.Slot;

import java.time.LocalDate;

@Entity
@Table(name = "accommodations")
@SqlResultSetMapping(
        name = "AccommodationsChessPlateMapper",
        classes = @ConstructorResult(
                targetClass = QueryResultRow.class,
                columns = {
                        @ColumnResult(name = "houseId", type = Long.class),
                        @ColumnResult(name = "houseName"),
                        @ColumnResult(name = "roomId", type = Long.class),
                        @ColumnResult(name = "roomName", type = String.class),
                        @ColumnResult(name = "slotId", type = Long.class),
                        @ColumnResult(name = "slotLabel", type = String.class),
                        @ColumnResult(name = "accommodationId", type = Long.class),
                        @ColumnResult(name = "startDate", type = LocalDate.class),
                        @ColumnResult(name = "endDate", type = LocalDate.class),
                        @ColumnResult(name = "residentId", type = Long.class),
                        @ColumnResult(name = "residentFirstName", type = String.class),
                        @ColumnResult(name = "residentBirthDate", type = LocalDate.class),
                }))
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;
    @ManyToOne
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;
    private LocalDate start;
    private LocalDate endDate;
    public Accommodation(Long id) {
        this.id = id;
    }
    public Accommodation() {
    }

    public Long getId() {
        return id;
    }

    public Resident getResident() {
        return resident;
    }

    public void setResident(Resident resident) {
        this.resident = resident;
    }

    public Slot getSlot() {
        return slot;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
