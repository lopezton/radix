package io.tonelope.tutorial.msdockapp.applinkservice.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.tonelope.tutorial.msdockapp.applinkservice.dao.UserRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.InvalidJwtToken;
import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.JwtSettings;
import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.JwtToken;
import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.JwtTokenFactory;
import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.RawAccessJwtToken;
import io.tonelope.tutorial.msdockapp.applinkservice.security.jwt.RefreshToken;
import io.tonelope.tutorial.msdockapp.applinkservice.security.model.UserPrincipal;
import lombok.val;

@RestController
public class RefreshTokenEndpoint {
	
    @Autowired
    private JwtTokenFactory tokenFactory;
    
    @Autowired 
    private JwtSettings jwtSettings;
    
    @Autowired 
    private UserRepository userRepository;
    
    @Autowired 
    private TokenVerifier tokenVerifier;
    
    @Autowired 
    @Qualifier("jwtHeaderTokenExtractor")
    private TokenExtractor tokenExtractor;
    
    @RequestMapping(value="${app.security.entrypoint.refresh}", method=RequestMethod.GET, produces={ MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody JwtToken refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        val tokenPayload = tokenExtractor.extract(request.getHeader(SecurityConfig.JWT_TOKEN_HEADER_PARAM));
        
        val rawToken = new RawAccessJwtToken(tokenPayload);
        val refreshToken = RefreshToken.create(rawToken, jwtSettings.getTokenSigningKey()).orElseThrow(() -> new InvalidJwtToken());

        val jti = refreshToken.getJti();
        if (!tokenVerifier.verify(jti)) {
            throw new InvalidJwtToken();
        }

        val subject = refreshToken.getSubject();
        val user = userRepository.findByUsername(subject).orElseThrow(() -> new UsernameNotFoundException("User not found: " + subject));

        if (user.getGrantedAuthorities() == null) {
        	throw new InsufficientAuthenticationException("User has no roles assigned");
        }

        val userPrincipal = UserPrincipal.create(user);

        return tokenFactory.createAccessJwtToken(userPrincipal);
    }
}