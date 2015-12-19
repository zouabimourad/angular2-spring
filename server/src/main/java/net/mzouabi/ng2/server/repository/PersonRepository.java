package net.mzouabi.ng2.server.repository;

import net.mzouabi.ng2.server.model.Person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface PersonRepository extends JpaRepository<Person, Long>, PersonRepositoryCustom {

}
