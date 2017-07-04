package io.tonelope.tutorial.msdockapp.applinkservice.conf;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.tonelope.tutorial.msdockapp.applinkservice.dao.UserRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.model.User;

@Configuration
public class LoadMongoDB implements ApplicationListener<ApplicationReadyEvent> {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public void onApplicationEvent(ApplicationReadyEvent arg0) {
		final User user1 = new User();
		user1.setUsername("a@a.com");
		user1.setPassword("password");
		user1.setGrantedAuthorities(new ArrayList<GrantedAuthority>());
		user1.getGrantedAuthorities().add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		
		final User user2 = new User();
		user2.setUsername("b@b.com");
		user2.setPassword("password");
		user2.setGrantedAuthorities(new ArrayList<GrantedAuthority>());
		user2.getGrantedAuthorities().add(new SimpleGrantedAuthority("ROLE_USER"));
		
		this.userRepository.deleteAll();
		this.userRepository.save(user1);
		this.userRepository.save(user2);
	}
	
	
}
