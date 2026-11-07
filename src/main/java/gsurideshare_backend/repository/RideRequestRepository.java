package gsurideshare_backend.repository;
import gsurideshare_backend.model.RideRequest; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface RideRequestRepository extends JpaRepository<RideRequest,UUID>{List<RideRequest> findByRideId(UUID rideId); List<RideRequest> findByPassengerIdOrderByCreatedAtDesc(UUID id); boolean existsByRideIdAndPassengerId(UUID rideId,UUID passengerId);}
