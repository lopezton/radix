package org.xpanxion.radix.radixserver.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.xpanxion.radix.radixserver.common.ErrorCode;
import org.xpanxion.radix.radixserver.common.ErrorResponse;
import org.xpanxion.radix.radixserver.dao.MongoUserRepository;
import org.xpanxion.radix.radixserver.dao.model.MongoUser;
import org.xpanxion.radix.radixserver.exception.ApplicationException;

@RestController
public class UserController {

	@Autowired
	private MongoUserRepository userRepository;
	
	@RequestMapping(value = "/user/active", method = RequestMethod.GET)
	public MongoUser getActiveUser(Principal principal) {
		return this.userRepository
				.findByCredentialsUsername(principal.getName())
				.orElseThrow(() -> new ApplicationException(ErrorResponse.of("No user is currently logged in.", 
						ErrorCode.AUTHENTICATION, HttpStatus.BAD_REQUEST)));
	}
}
