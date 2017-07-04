package io.tonelope.tutorial.msdockapp.applinkservice.security.exception;

import org.springframework.security.core.AuthenticationException;

import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.JwtToken;

public class JwtExpiredTokenException extends AuthenticationException {
    
    private JwtToken token;

    public JwtExpiredTokenException(String msg) {
        super(msg);
    }

    public JwtExpiredTokenException(JwtToken token, String msg, Throwable t) {
        super(msg, t);
        this.token = token;
    }

    public String token() {
        return this.token.getToken();
    }
}