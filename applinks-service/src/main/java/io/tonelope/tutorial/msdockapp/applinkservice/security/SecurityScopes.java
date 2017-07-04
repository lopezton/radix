package io.tonelope.tutorial.msdockapp.applinkservice.security;

public enum SecurityScopes {
    ADMIN,
    USER,
	REFRESH_TOKEN;
    
    public String authority() {
        return "ROLE_" + this.name();
    }
}