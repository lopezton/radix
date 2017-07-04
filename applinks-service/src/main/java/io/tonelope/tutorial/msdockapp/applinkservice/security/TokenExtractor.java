package io.tonelope.tutorial.msdockapp.applinkservice.security;

/**
 * Implementations of this interface should always return raw base-64 encoded
 * representation of JWT Token.
 */
public interface TokenExtractor {
    public String extract(String payload);
}