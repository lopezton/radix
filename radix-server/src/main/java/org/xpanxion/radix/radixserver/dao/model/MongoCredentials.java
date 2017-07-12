package org.xpanxion.radix.radixserver.dao.model;

import lombok.Data;

@Data
public class MongoCredentials {
	private String username;
	private String password;
	
	public MongoCredentials(String username, String password) {
		this.username = username;
		this.password = password;
	}
}