package gsurideshare_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "vehicles")
public class Vehicle extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(nullable = false) private String make;
    @Column(nullable = false) private String model;
    private String color;
    private Integer year;

    @Column(nullable = false, unique = true)
    private String licensePlate;

    @Column(nullable = false)
    private int seatCapacity;   // passenger seats, excluding driver
}
