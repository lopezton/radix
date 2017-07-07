package io.tonelope.tutorial.msdockapp.applinkservice.dao.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "user_applications")
public class MongoApplication {
	private String id;
	private String title;
	private String description;
	private String url;
}