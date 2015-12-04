package net.mzouabi.ng2.server.service;

import javax.inject.Inject;

import net.mzouabi.ng2.server.dto.PersonDTO;
import net.mzouabi.ng2.server.mapper.PersonMapper;
import net.mzouabi.ng2.server.model.Person;
import net.mzouabi.ng2.server.repository.PersonRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PersonServiceImpl implements PersonService {

	@Inject
	PersonRepository personRepository;

	@Inject
	PersonMapper personMapper;

	@Override
	public Page<PersonDTO> findPersons(Pageable pageable) {
		return personRepository.findAll(pageable).map( person -> personMapper.toDTO(person));
	}
}
