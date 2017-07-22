package org.xpanxion.radix.radixserver.dao.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "user_applications")
public class MongoUserApplications {

	private String id;
	
	private String userId;
	
	private List<MongoApplication> applications;
}
