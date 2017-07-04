package io.tonelope.tutorial.msdockapp.applinkservice.security.model;

import java.util.Collection;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.tonelope.tutorial.msdockapp.applinkservice.model.User;
import lombok.Getter;

@Getter
public class UserPrincipal implements UserDetails {

	private User user;
	
	public static UserPrincipal create(User user) {
        if (null == user || StringUtils.isBlank(user.getUsername()))  {
        	throw new IllegalArgumentException("Missing user information: " + user);
        }
        return new UserPrincipal(user);
    }
	
	public UserPrincipal(User user) {
		this.user = user;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.user.getGrantedAuthorities();
	}

	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getUsername();
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
