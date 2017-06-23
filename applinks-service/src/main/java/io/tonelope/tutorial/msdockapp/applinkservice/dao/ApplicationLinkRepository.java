package io.tonelope.tutorial.msdockapp.applinkservice.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.tonelope.tutorial.msdockapp.applinkservice.model.ApplicationLink;

@RepositoryRestResource(path = "app-links")
public interface ApplicationLinkRepository extends MongoRepository<ApplicationLink, Long> {

}
