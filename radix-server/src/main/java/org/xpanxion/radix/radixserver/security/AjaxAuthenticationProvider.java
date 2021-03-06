package org.xpanxion.radix.radixserver.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.xpanxion.radix.radixserver.dao.MongoUserRepository;
import org.xpanxion.radix.radixserver.security.model.UserPrincipal;

import io.jsonwebtoken.lang.Assert;
import lombok.val;

@Component
public class AjaxAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
    private MongoUserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Assert.notNull(authentication, "No authentication data provided");

        val username = (String) authentication.getPrincipal();
        val password = (String) authentication.getCredentials();

        val user = userRepository.findByCredentialsUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        if (!password.equals(user.getCredentials().getPassword())) {
            throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
        }

        if (user.getGrantedAuthorities() == null) {
        	throw new InsufficientAuthenticationException("User has no roles assigned");
        }

        val userPrincipal = UserPrincipal.create(user);

        return new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}