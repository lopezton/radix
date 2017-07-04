package io.tonelope.tutorial.msdockapp.applinkservice.security;

public interface TokenVerifier {
	
	/**
	 * 
	 * @param jti
	 * @return
	 */
    public boolean verify(String jti);
}