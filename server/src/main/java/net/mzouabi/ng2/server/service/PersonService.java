package net.mzouabi.ng2.server.service;

import net.mzouabi.ng2.server.dto.PersonDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PersonService {

	public Page<PersonDTO> findPersons(Pageable pageable);

	public void updatePerson(PersonDTO personDTO);

	public void savePerson(PersonDTO personDTO);

	public void deletePerson(Long id);

}
