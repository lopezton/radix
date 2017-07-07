package io.tonelope.tutorial.msdockapp.applinkservice.security.model;

import lombok.Data;

@Data
public class LoginRequest {

	private String username;
	private String password;
}
