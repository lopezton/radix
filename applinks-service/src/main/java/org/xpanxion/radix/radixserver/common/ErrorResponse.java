package org.xpanxion.radix.radixserver.common;

import java.util.Date;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ErrorResponse {
    
    private final HttpStatus status;
    private final String message;
    private final ErrorCode errorCode;
    private final Date timestamp;

    protected ErrorResponse(final String message, final ErrorCode errorCode, HttpStatus status) {
        this.message = message;
        this.errorCode = errorCode;
        this.status = status;
        this.timestamp = new java.util.Date();
    }

    public static ErrorResponse of(final String message, final ErrorCode errorCode, HttpStatus status) {
        return new ErrorResponse(message, errorCode, status);
    }
}
