package net.mzouabi.ng2.server.repository;

import net.mzouabi.ng2.server.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long>, PersonRepositoryCustom {

}
