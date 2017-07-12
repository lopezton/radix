package org.xpanxion.radix.radixserver.dao;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.xpanxion.radix.radixserver.dao.model.MongoUser;

@RepositoryRestResource(path = "users", collectionResourceRel = "users", itemResourceRel = "user")
public interface MongoUserRepository extends MongoRepository<MongoUser, String> {

	Optional<MongoUser> findByCredentialsUsername(String username);

}
