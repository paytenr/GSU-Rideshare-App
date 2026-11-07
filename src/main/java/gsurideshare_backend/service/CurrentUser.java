package gsurideshare_backend.service;

import gsurideshare_backend.model.User;
import gsurideshare_backend.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CurrentUser {

    private final UserRepository users;

    public CurrentUser(UserRepository users) {
        this.users = users;
    }

    public User get() {
        return users.findByEmailIgnoreCase(
            SecurityContextHolder.getContext()
                .getAuthentication()
                .getName()
        ).orElseThrow(
            () -> new IllegalArgumentException("User not found")
        );
    }
}