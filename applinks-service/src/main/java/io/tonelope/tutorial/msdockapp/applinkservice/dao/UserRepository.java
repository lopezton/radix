package io.tonelope.tutorial.msdockapp.applinkservice.dao;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.tonelope.tutorial.msdockapp.applinkservice.model.User;

@RepositoryRestResource(exported = false)
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByUsername(String username);

}
