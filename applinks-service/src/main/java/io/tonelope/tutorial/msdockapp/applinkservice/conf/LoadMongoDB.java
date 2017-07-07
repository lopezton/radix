package io.tonelope.tutorial.msdockapp.applinkservice.conf;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.tonelope.tutorial.msdockapp.applinkservice.dao.MongoApplicationRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.dao.MongoUserRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.dao.model.MongoApplication;
import io.tonelope.tutorial.msdockapp.applinkservice.dao.model.MongoPersonalData;
import io.tonelope.tutorial.msdockapp.applinkservice.dao.model.MongoUser;
import lombok.val;

@Configuration
public class LoadMongoDB implements ApplicationListener<ApplicationReadyEvent> {
	
	@Autowired
	private MongoUserRepository userRepository;
	
	@Autowired
	private MongoApplicationRepository applicationRepository;

	@Override
	public void onApplicationEvent(ApplicationReadyEvent arg0) {
		val user1 = new MongoUser("a@a.com", "password", new ArrayList<GrantedAuthority>());
		user1.getGrantedAuthorities().add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		user1.setPersonalData(new MongoPersonalData());
		user1.getPersonalData().setFirstName("Arthur");
		user1.getPersonalData().setLastName("Admin");
		
		val user2 = new MongoUser("b@b.com", "password", new ArrayList<GrantedAuthority>());
		user2.getGrantedAuthorities().add(new SimpleGrantedAuthority("ROLE_USER"));
		user2.setPersonalData(new MongoPersonalData());
		user2.getPersonalData().setFirstName("Common");
		user2.getPersonalData().setLastName("User");
		
		val applications = new ArrayList<MongoApplication>();
		for(int i = 0; i < 10; i++) {
			applications.add(new MongoApplication());
			applications.get(i).setTitle("Sample App " + i);
			applications.get(i).setDescription("Some sample description.");
			applications.get(i).setUrl("http://localhost:9001/");
			this.applicationRepository.save(applications.get(i));
		}
		
		user1.setApplications(applications);
		user2.setApplications(applications);
		
		this.userRepository.deleteAll();
		this.userRepository.save(user1);
		this.userRepository.save(user2);
	}
	
	
}
