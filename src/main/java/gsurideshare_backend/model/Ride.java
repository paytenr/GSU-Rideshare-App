package gsurideshare_backend.model;
import jakarta.persistence.*; import lombok.Getter; import lombok.Setter; import java.math.BigDecimal; import java.time.Instant;
@Getter @Setter @Entity @Table(name="rides")
public class Ride extends BaseEntity {
 @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="driver_id",nullable=false) private User driver;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="vehicle_id") private Vehicle vehicle;
 @Column(nullable=false) private String originAddress; private Double originLat; private Double originLng;
 @Column(nullable=false) private String destinationAddress; private Double destinationLat; private Double destinationLng;
 @Column(nullable=false) private Instant departureTime; @Column(nullable=false) private int totalSeats;
 @Column(nullable=false) private int availableSeats; @Column(nullable=false,precision=8,scale=2) private BigDecimal pricePerSeat=BigDecimal.ZERO;
 @Column(length=500) private String notes;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private RideStatus status=RideStatus.OPEN;
}
