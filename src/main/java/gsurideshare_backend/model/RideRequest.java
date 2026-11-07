package gsurideshare_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "ride_requests",
       uniqueConstraints = @UniqueConstraint(columnNames = {"ride_id", "passenger_id"}))
public class RideRequest extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ride_id")
    private Ride ride;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "passenger_id")
    private User passenger;

    @Column(nullable = false)
    private int seatsRequested = 1;

    private String pickupAddress;
    private Double pickupLat;
    private Double pickupLng;

    @Column(length = 500)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status = RequestStatus.PENDING;
}
