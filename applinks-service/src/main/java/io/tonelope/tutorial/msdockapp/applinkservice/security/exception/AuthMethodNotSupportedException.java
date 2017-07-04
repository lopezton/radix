package io.tonelope.tutorial.msdockapp.applinkservice.security.exception;

import org.springframework.security.core.AuthenticationException;

public class AuthMethodNotSupportedException extends AuthenticationException {
	
	public AuthMethodNotSupportedException(String msg) {
		super(msg);
	}
}
