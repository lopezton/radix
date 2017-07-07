package io.tonelope.tutorial.msdockapp.applinkservice.dao;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.tonelope.tutorial.msdockapp.applinkservice.dao.model.MongoUser;

@RepositoryRestResource(path = "users", collectionResourceRel = "users", itemResourceRel = "user")
public interface MongoUserRepository extends MongoRepository<MongoUser, String> {

	Optional<MongoUser> findByCredentialsUsername(String username);

}
