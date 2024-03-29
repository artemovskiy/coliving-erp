package site.artemovskiy.colivingerp.domain.core.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, columnDefinition = "varchar(128)")
    private String name;
    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    private House house;
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private Set<Slot> slots;
    public Room(int id) {
        this.id = id;
    }

    public Room() {

    }

    public Set<Slot> getSlots() {
        return slots;
    }

    public void setSlots(Set<Slot> slots) {
        this.slots = slots;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }
}
