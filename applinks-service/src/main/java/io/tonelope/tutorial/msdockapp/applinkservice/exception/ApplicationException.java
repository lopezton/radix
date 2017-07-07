package io.tonelope.tutorial.msdockapp.applinkservice.exception;

import org.springframework.http.HttpStatus;

import io.tonelope.tutorial.msdockapp.applinkservice.common.ErrorCode;
import io.tonelope.tutorial.msdockapp.applinkservice.common.ErrorResponse;
import lombok.Getter;

@Getter
public class ApplicationException extends RuntimeException {

	private ErrorResponse errorResponse;
	
	public ApplicationException() {
		this("An unexpected error occurred");
	}
	
	public ApplicationException(ErrorResponse errorResponse) {
		this.errorResponse = errorResponse;
	}
	
	public ApplicationException(String msg) {
		this(ErrorResponse.of(msg, ErrorCode.GENERAL, HttpStatus.BAD_REQUEST));
	}
}
