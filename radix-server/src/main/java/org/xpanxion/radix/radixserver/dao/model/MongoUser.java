package org.xpanxion.radix.radixserver.dao.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Data
@Document(collection="users")
public class MongoUser {
	private String id;
	private MongoCredentials credentials;
	private List<GrantedAuthority> grantedAuthorities;
	
	private MongoPersonalData personalData;
	
	@DBRef
	private List<MongoApplication> applications;
	
	public MongoUser() {}
	
	public MongoUser(String username, String password, List<GrantedAuthority> grantedAuthorities) {
		this.credentials = new MongoCredentials(username, password);
		this.grantedAuthorities = grantedAuthorities;
	}
}
