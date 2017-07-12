package org.xpanxion.radix.radixserver.security.exception;

import org.springframework.security.core.AuthenticationException;

public class AuthMethodNotSupportedException extends AuthenticationException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2773327198931696827L;

	public AuthMethodNotSupportedException(String msg) {
		super(msg);
	}
}
