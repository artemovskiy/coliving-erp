package site.artemovskiy.colivingerp.domain.residents.model;

import jakarta.persistence.*;
import site.artemovskiy.colivingerp.domain.core.model.Slot;

import java.util.Date;

@Entity
@Table(name = "accommodations")
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
    private Date start;
    private Date endDate;

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

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
