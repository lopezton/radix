package io.tonelope.tutorial.msdockapp.applinkservice.service;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import io.tonelope.tutorial.msdockapp.applinkservice.dao.UserRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.security.model.UserPrincipal;
import lombok.val;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SpringDataUserDetailsService implements UserDetailsService {

	@Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Searching for user: {}", username);
        val user = userRepository.findByUsername(username).get();
        if (user == null){
            throw new UsernameNotFoundException(username);
        } else {
        	System.out.println("Found user: " + ToStringBuilder.reflectionToString(user));
            return new UserPrincipal(user);
        }
    }
}
