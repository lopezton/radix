package org.xpanxion.radix.radixserver.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.xpanxion.radix.radixserver.dao.model.MongoApplication;

@RepositoryRestResource(path = "user-applications", collectionResourceRel = "applications", itemResourceRel = "application")
public interface MongoApplicationRepository extends MongoRepository<MongoApplication, String> {

}
