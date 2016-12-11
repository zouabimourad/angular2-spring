package net.mzouabi.ng2.server.mvc;

import net.mzouabi.ng2.server.dto.PersonDTO;
import net.mzouabi.ng2.server.service.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin
@RequestMapping(value = "/api/person")
public class PersonController {

    final static Logger LOG = LoggerFactory.getLogger(PersonController.class);

    @Inject
    PersonService personService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<PersonDTO>> findAllPerson(Pageable pageable, HttpServletRequest req) {
        Page<PersonDTO> page = personService.findPersons(pageable);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PersonDTO> getPerson(@PathVariable Long id, HttpServletRequest req) {
        PersonDTO person = personService.getPerson(id);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public void createPerson(@RequestBody PersonDTO personDTO) {
        personService.savePerson(personDTO);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public void updatePerson(@RequestBody PersonDTO personDTO) {
        personService.updatePerson(personDTO);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
    }
}


