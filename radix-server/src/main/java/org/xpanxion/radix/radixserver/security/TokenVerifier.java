package org.xpanxion.radix.radixserver.security;

public interface TokenVerifier {
	
	/**
	 * 
	 * @param jti
	 * @return
	 */
    public boolean verify(String jti);
}