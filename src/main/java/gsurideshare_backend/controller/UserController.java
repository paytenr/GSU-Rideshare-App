package gsurideshare_backend.controller;
import gsurideshare_backend.service.CurrentUser; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/v1/users") public class UserController {private final CurrentUser current;public UserController(CurrentUser c){current=c;} @GetMapping("/me") public Object me(){var u=current.get();return new AuthController.Profile(u.getId(),u.getEmail(),u.getFirstName(),u.getLastName(),u.getPhone(),u.getRole().name());}}
