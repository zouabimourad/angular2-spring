package net.mzouabi.ng2.server.service;

import net.mzouabi.ng2.server.dto.PersonDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PersonService {

    Page<PersonDTO> findPersons(Pageable pageable);

    Optional<PersonDTO> getPerson(Long id);

    void updatePerson(PersonDTO personDTO);

    void savePerson(PersonDTO personDTO);

    void deletePerson(Long id);

}
