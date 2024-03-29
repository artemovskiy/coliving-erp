package site.artemovskiy.colivingerp.domain.core.model;

import jakarta.persistence.*;
import site.artemovskiy.colivingerp.domain.residents.model.Accommodation;

import java.util.Set;

@Entity
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, columnDefinition = "varchar(128)")
    private String label;
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
    @OneToMany(mappedBy = "slot", fetch = FetchType.LAZY)
    private Set<Accommodation> accommodations;
    public Slot(int id) {
        this.id = id;
    }

    public Slot() {

    }

    public Set<Accommodation> getAccommodations() {
        return accommodations;
    }

    public void setAccommodations(Set<Accommodation> accommodations) {
        this.accommodations = accommodations;
    }

    public int getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

}
