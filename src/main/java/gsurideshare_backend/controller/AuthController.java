package gsurideshare_backend.controller;
import gsurideshare_backend.model.*; import gsurideshare_backend.repository.UserRepository; import gsurideshare_backend.security.JwtService; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.springframework.http.*; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/v1/auth") public class AuthController {
 public record Register(@Email @NotBlank String email,@NotBlank @Size(min=8,max=100) String password,@NotBlank String firstName,@NotBlank String lastName,String phone){}
 public record Login(@Email @NotBlank String email,@NotBlank String password){}
 public record Profile(java.util.UUID id,String email,String firstName,String lastName,String phone,String role){}
 public record AuthResult(String token,String tokenType,Profile user){}
 private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthController(UserRepository u,PasswordEncoder e,JwtService j){users=u;encoder=e;jwt=j;}
 @PostMapping("/register") public ResponseEntity<AuthResult> register(@Valid @RequestBody Register x){
  String email=x.email().trim().toLowerCase(); if(!email.endsWith("@georgiasouthern.edu"))throw new IllegalArgumentException("Use your @georgiasouthern.edu email");
  if(users.existsByEmailIgnoreCase(email))throw new IllegalStateException("Email already registered");
  User u=new User();u.setEmail(email);u.setPasswordHash(encoder.encode(x.password()));u.setFirstName(x.firstName().trim());u.setLastName(x.lastName().trim());u.setPhone(x.phone());u.setRole(Role.RIDER);users.save(u);
  return ResponseEntity.status(HttpStatus.CREATED).body(result(u));
 }
 @PostMapping("/login") public AuthResult login(@Valid @RequestBody Login x){User u=users.findByEmailIgnoreCase(x.email().trim()).orElseThrow(()->new IllegalArgumentException("Invalid email or password"));if(!encoder.matches(x.password(),u.getPasswordHash()))throw new IllegalArgumentException("Invalid email or password");return result(u);}
 private AuthResult result(User u){return new AuthResult(jwt.create(u.getEmail()),"Bearer",new Profile(u.getId(),u.getEmail(),u.getFirstName(),u.getLastName(),u.getPhone(),u.getRole().name()));}
}
