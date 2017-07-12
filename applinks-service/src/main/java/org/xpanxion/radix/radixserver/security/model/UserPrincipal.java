package org.xpanxion.radix.radixserver.security.model;

import java.util.Collection;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.xpanxion.radix.radixserver.dao.model.MongoUser;

import lombok.Getter;

@Getter
public class UserPrincipal implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8053871213495615279L;
	
	private final MongoUser user;
	
	private UserPrincipal(String username, List<GrantedAuthority> authorities) {
		this.user = new MongoUser(username, null, authorities);
	}
	
	public static UserPrincipal create(String username, List<GrantedAuthority> authorities) {
        if (StringUtils.isBlank(username))  {
        	throw new IllegalArgumentException("Missing username: " + username);
        }

        return new UserPrincipal(username, authorities);
    }
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.user.getGrantedAuthorities();
	}

	@Override
	public String getPassword() {
		return this.user.getCredentials().getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getCredentials().getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
