package site.artemovskiy.colivingerp.modules.houses.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "houses")
public class House {
    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY)
    public Set<Room> rooms;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, columnDefinition = "varchar(128)")
    private String name;

    public House() {
    }

    public House(int id) {
        this.id = id;
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

    public Set<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

}
