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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/person")
public class PersonController {

	final static Logger loggger = LoggerFactory.getLogger(PersonController.class);

	@Inject
	PersonService personService;


	@RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<PersonDTO>> findAllPerson(Pageable pageable, HttpServletRequest req) {

		Page<PersonDTO> page = personService.findPersons(pageable);

		return new ResponseEntity<>(page, HttpStatus.OK);
	}
}