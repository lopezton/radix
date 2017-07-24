package org.xpanxion.radix.radixserver.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.xpanxion.radix.radixserver.dao.model.MongoUserApplications;

@RepositoryRestResource(path = "user-applications", collectionResourceRel = "userApplications", itemResourceRel = "userApplications")
public interface MongoUserApplicationsRepository extends MongoRepository<MongoUserApplications, String> {

	@RestResource(path = "userId", rel = "userId")
	@PostAuthorize("principal.user.id == #userId")
	MongoUserApplications findByUserId(@Param("userId") String userId);
}
