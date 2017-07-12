package org.xpanxion.radix.radixserver.security;

public enum SecurityScopes {
    ADMIN,
    USER,
	REFRESH_TOKEN;
    
    public String authority() {
        return "ROLE_" + this.name();
    }
}