package gsurideshare_backend.repository;
import gsurideshare_backend.model.Vehicle; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface VehicleRepository extends JpaRepository<Vehicle,UUID>{List<Vehicle> findByOwnerId(UUID ownerId); boolean existsByLicensePlateIgnoreCase(String plate);}
