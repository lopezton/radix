package io.tonelope.tutorial.msdockapp.applinkservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import io.tonelope.tutorial.msdockapp.applinkservice.dao.MongoUserRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.security.model.UserPrincipal;
import lombok.val;

@Component
public class SpringDataUserDetailsService implements UserDetailsService {

	@Autowired
    private MongoUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        val user = userRepository.findByCredentialsUsername(username).get();
        if (user == null){
            throw new UsernameNotFoundException(username);
        } else {
            return UserPrincipal.create(username, user.getGrantedAuthorities());
        }
    }
}
