package org.xpanxion.radix.radixserver.dao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class MongoCredentials {
	private String username;
	
	@JsonIgnore
	private String password;
	
	public MongoCredentials() {}
	
	public MongoCredentials(String username, String password) {
		this.username = username;
		this.password = password;
	}
}
