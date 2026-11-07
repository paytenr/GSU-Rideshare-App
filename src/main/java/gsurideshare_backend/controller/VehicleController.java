package gsurideshare_backend.controller;
import gsurideshare_backend.model.*; import gsurideshare_backend.repository.VehicleRepository; import gsurideshare_backend.service.CurrentUser; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.springframework.http.HttpStatus; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/v1/vehicles") public class VehicleController {
 public record Create(@NotBlank String make,@NotBlank String model,String color,Integer year,@NotBlank String licensePlate,@Min(1) @Max(8) int seatCapacity){}
 public record View(UUID id,UUID ownerId,String make,String model,String color,Integer year,String licensePlate,int seatCapacity){}
 private final VehicleRepository repo;private final CurrentUser current;public VehicleController(VehicleRepository r,CurrentUser c){repo=r;current=c;}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public View create(@Valid @RequestBody Create x){User u=current.get();if(u.getRole()!=Role.DRIVER)throw new IllegalStateException("Account must have DRIVER role");if(repo.existsByLicensePlateIgnoreCase(x.licensePlate()))throw new IllegalStateException("License plate already registered");Vehicle v=new Vehicle();v.setOwner(u);v.setMake(x.make());v.setModel(x.model());v.setColor(x.color());v.setYear(x.year());v.setLicensePlate(x.licensePlate().trim().toUpperCase());v.setSeatCapacity(x.seatCapacity());return view(repo.save(v));}
 @GetMapping public List<View> mine(){return repo.findByOwnerId(current.get().getId()).stream().map(VehicleController::view).toList();}
 static View view(Vehicle v){return new View(v.getId(),v.getOwner().getId(),v.getMake(),v.getModel(),v.getColor(),v.getYear(),v.getLicensePlate(),v.getSeatCapacity());}
}
