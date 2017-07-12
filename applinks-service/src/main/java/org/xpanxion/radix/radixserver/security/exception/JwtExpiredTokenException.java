package org.xpanxion.radix.radixserver.security.exception;

import org.springframework.security.core.AuthenticationException;
import org.xpanxion.radix.radixserver.security.jwt.JwtToken;

public class JwtExpiredTokenException extends AuthenticationException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1002321929442474532L;
	
	private JwtToken token;

    public JwtExpiredTokenException(String msg) {
        super(msg);
    }

    public JwtExpiredTokenException(JwtToken token, String msg, Throwable t) {
        super(msg, t);
        this.token = token;
    }

    public String token() {
        return this.token.getToken();
    }
}