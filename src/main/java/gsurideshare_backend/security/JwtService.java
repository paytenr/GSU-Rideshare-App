package gsurideshare_backend.security;
import io.jsonwebtoken.Jwts; import io.jsonwebtoken.security.Keys; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service; import javax.crypto.SecretKey; import java.nio.charset.StandardCharsets; import java.util.Date;
@Service public class JwtService {
 private final SecretKey key; private final long ttl;
 public JwtService(@Value("${app.jwt.secret}") String secret,@Value("${app.jwt.expiration-ms}") long ttl){if(secret.getBytes(StandardCharsets.UTF_8).length<32)throw new IllegalArgumentException("JWT secret must be at least 32 bytes");key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));this.ttl=ttl;}
 public String create(String email){long n=System.currentTimeMillis();return Jwts.builder().subject(email).issuedAt(new Date(n)).expiration(new Date(n+ttl)).signWith(key).compact();}
 public String subject(String token){return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();}
}
