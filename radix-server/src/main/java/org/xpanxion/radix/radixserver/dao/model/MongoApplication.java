package org.xpanxion.radix.radixserver.dao.model;

import lombok.Data;

@Data
public class MongoApplication {
	private String id;
	private String title;
	private String description;
	private String url;
	private boolean isWeb = true;
}