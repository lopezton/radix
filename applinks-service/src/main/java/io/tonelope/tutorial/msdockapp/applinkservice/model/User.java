package io.tonelope.tutorial.msdockapp.applinkservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Data
@Document(collection="users")
public class User {

	@Id
	private String id;
	
	private String username;
	private String password;
	private List<GrantedAuthority> grantedAuthorities;
	
	public User() {}
	
	public User(String username, List<GrantedAuthority> grantedAuthorities) {
		this.username = username;
		this.grantedAuthorities = grantedAuthorities;
	}
}
