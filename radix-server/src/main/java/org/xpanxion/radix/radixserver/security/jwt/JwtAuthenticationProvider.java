package org.xpanxion.radix.radixserver.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.xpanxion.radix.radixserver.dao.MongoUserRepository;
import org.xpanxion.radix.radixserver.security.model.UserPrincipal;

import lombok.val;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {
    
	@Autowired
	private JwtSettings jwtSettings;
	
	@Autowired
	private MongoUserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        val rawAccessToken = (RawAccessJwtToken) authentication.getCredentials();

        val jwsClaims = rawAccessToken.parseClaims(jwtSettings.getTokenSigningKey());
        val username = jwsClaims.getBody().getSubject();
        
        val context = UserPrincipal.create(this.userRepository.findByCredentialsUsername(username).get());
        
        return new JwtAuthenticationToken(context, context.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
    }
}