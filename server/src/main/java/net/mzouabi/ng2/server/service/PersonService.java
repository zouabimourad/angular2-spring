package net.mzouabi.ng2.server.service;

import net.mzouabi.ng2.server.model.Person;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PersonService {

	public Page<Person> findPersons(Pageable pageable);

}
