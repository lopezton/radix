package org.xpanxion.radix.radixserver.security.jwt;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.xpanxion.radix.radixserver.security.model.UserPrincipal;

import lombok.val;

@Component
@SuppressWarnings("unchecked")
public class JwtAuthenticationProvider implements AuthenticationProvider {
    
	@Autowired
	private JwtSettings jwtSettings;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        val rawAccessToken = (RawAccessJwtToken) authentication.getCredentials();

        val jwsClaims = rawAccessToken.parseClaims(jwtSettings.getTokenSigningKey());
        val username = jwsClaims.getBody().getSubject();
        List<String> scopes = jwsClaims.getBody().get("scopes", List.class);
        List<GrantedAuthority> authorities = scopes.stream()
                .map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());
        
        val context = UserPrincipal.create(username, authorities);
        
        return new JwtAuthenticationToken(context, context.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
    }
}