package net.mzouabi.ng2.server.repository;

import net.mzouabi.ng2.server.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long>, PersonRepositoryCustom {

    Optional<Person> findById(Long id);

}
