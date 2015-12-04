package net.mzouabi.ng2.server.mapper;

import net.mzouabi.ng2.server.dto.PersonDTO;
import net.mzouabi.ng2.server.model.Person;
import org.mapstruct.Mapper;

/**
 * Created by mouradzouabi on 04/12/15.
 */
@Mapper(componentModel = "spring")
public interface PersonMapper {

    public PersonDTO toDTO(Person person);

}
