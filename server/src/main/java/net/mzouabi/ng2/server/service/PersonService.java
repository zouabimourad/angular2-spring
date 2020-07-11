package net.mzouabi.ng2.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.mzouabi.ng2.server.dto.PersonDTO;
import net.mzouabi.ng2.server.mapper.PersonMapper;
import net.mzouabi.ng2.server.model.Person;
import net.mzouabi.ng2.server.repository.PersonRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class PersonService {

    private final PersonRepository personRepository;

    private final PersonMapper personMapper;

    public Page<PersonDTO> findPersons(Pageable pageable) {
        return personRepository.findAll(pageable).map(personMapper::toDTO);
    }

    public Optional<PersonDTO> getPerson(Long id) {
        return personRepository.findById(id).map(personMapper::toDTO);
    }

    public void updatePerson(PersonDTO personDTO) {
        personRepository.findById(personDTO.getId())
                .ifPresent(person -> personMapper.mapToEntity(personDTO, person));

    }

    public void savePerson(PersonDTO personDTO) {
        Person person = personMapper.toEntity(personDTO);
        personRepository.save(person);
    }

    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

}
