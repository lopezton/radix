package io.tonelope.tutorial.msdockapp.applinkservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "applicationLinks")
public class ApplicationLink {

	@Id
	private Long id;
	
	private String title;
	private String description;
	private String url;
}
