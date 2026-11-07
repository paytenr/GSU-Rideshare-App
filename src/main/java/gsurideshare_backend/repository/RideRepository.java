package gsurideshare_backend.repository;
import gsurideshare_backend.model.*; import org.springframework.data.jpa.repository.*; import org.springframework.data.repository.query.Param; import jakarta.persistence.LockModeType; import java.util.*; import java.time.Instant;
public interface RideRepository extends JpaRepository<Ride,UUID>{
 @Lock(LockModeType.PESSIMISTIC_WRITE) @Query("select r from Ride r where r.id=:id") Optional<Ride> findLocked(@Param("id") UUID id);
 @Query("select r from Ride r where r.status=gsurideshare_backend.model.RideStatus.OPEN and r.availableSeats>=:seats and (:origin is null or lower(r.originAddress) like lower(concat('%',:origin,'%'))) and (:dest is null or lower(r.destinationAddress) like lower(concat('%',:dest,'%'))) and r.departureTime>=:fromTime and (:toTime is null or r.departureTime<:toTime) order by r.departureTime")
 List<Ride> search(@Param("origin") String origin,@Param("dest") String dest,@Param("fromTime") Instant fromTime,@Param("toTime") Instant toTime,@Param("seats") int seats);
}
