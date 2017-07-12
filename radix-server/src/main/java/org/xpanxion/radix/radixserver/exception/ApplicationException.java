package org.xpanxion.radix.radixserver.exception;

import org.springframework.http.HttpStatus;
import org.xpanxion.radix.radixserver.common.ErrorCode;
import org.xpanxion.radix.radixserver.common.ErrorResponse;

import lombok.Getter;

@Getter
public class ApplicationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 816818068749151652L;
	
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
