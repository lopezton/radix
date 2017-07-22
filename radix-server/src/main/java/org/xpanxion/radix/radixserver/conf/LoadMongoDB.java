package org.xpanxion.radix.radixserver.conf;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.xpanxion.radix.radixserver.dao.MongoUserApplicationsRepository;
import org.xpanxion.radix.radixserver.dao.MongoUserRepository;
import org.xpanxion.radix.radixserver.dao.model.MongoApplication;
import org.xpanxion.radix.radixserver.dao.model.MongoPersonalData;
import org.xpanxion.radix.radixserver.dao.model.MongoUser;
import org.xpanxion.radix.radixserver.dao.model.MongoUserApplications;

import lombok.val;

@Configuration
public class LoadMongoDB implements ApplicationListener<ApplicationReadyEvent> {
	
	@Autowired
	private MongoUserRepository userRepository;
	
	@Autowired
	private MongoUserApplicationsRepository userApplicationsRepository;

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
		
		this.userRepository.deleteAll();
		this.userRepository.save(user1);
		this.userRepository.save(user2);
		
		List<MongoApplication> applications = new ArrayList<>();
		for(int i = 0; i < 10; i++) {
			applications.add(new MongoApplication());
			applications.get(i).setTitle("Sample App " + i);
			applications.get(i).setDescription("Some sample description.");
			applications.get(i).setUrl("http://localhost:9001/");
		}

		val apps1 = new MongoUserApplications();
		apps1.setUserId(user1.getId());
		apps1.setApplications(applications);
		
		applications = new ArrayList<MongoApplication>();
		for(int i = 0; i < 20; i++) {
			applications.add(new MongoApplication());
			applications.get(i).setTitle("Sample App " + (i + 10));
			applications.get(i).setDescription("Some sample description.");
			applications.get(i).setUrl("http://localhost:9001/");
		}
		
		val apps2 = new MongoUserApplications();
		apps2.setUserId(user2.getId());
		apps2.setApplications(applications);
		
		this.userApplicationsRepository.deleteAll();
		this.userApplicationsRepository.save(apps1);
		this.userApplicationsRepository.save(apps2);
	}
	
	
}
