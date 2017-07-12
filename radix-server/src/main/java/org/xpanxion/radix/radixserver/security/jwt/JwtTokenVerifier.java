package org.xpanxion.radix.radixserver.security.jwt;

import org.springframework.stereotype.Component;
import org.xpanxion.radix.radixserver.security.TokenVerifier;

@Component
public class JwtTokenVerifier implements TokenVerifier {

	@Override
	public boolean verify(String jti) {
		// TODO: Implement this if needed. This can be used to blacklist JWT tokens if necessary.
		return true;
	}

}
