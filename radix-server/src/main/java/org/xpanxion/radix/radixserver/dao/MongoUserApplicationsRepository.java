package org.xpanxion.radix.radixserver.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.xpanxion.radix.radixserver.dao.model.MongoUserApplications;

@RepositoryRestResource(path = "user-applications", collectionResourceRel = "userApplications", itemResourceRel = "userApplications")
public interface MongoUserApplicationsRepository extends MongoRepository<MongoUserApplications, String> {

	@RestResource(path = "userId", rel = "userId")
	@PreAuthorize("principal.user.id == #userId")
	MongoUserApplications findByUserId(@Param("userId") String userId);
	
	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	Page<MongoUserApplications> findAll(Pageable pageable);
	
	@Override
	@PostAuthorize("hasRole('ROLE_ADMIN') or returnObject.userId == principal.user.id")
	MongoUserApplications findOne(String id);
	
	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') or principal.user.id == #c.userId")
	<S extends MongoUserApplications> S save(@P("c") S entity);
	
	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') or principal.user.id == #c.userId")
	void delete(@P("c") MongoUserApplications entity);
}
