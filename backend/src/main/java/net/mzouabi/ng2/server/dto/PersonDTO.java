package net.mzouabi.ng2.server.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PersonDTO extends AbstractDTO {

    private String firstname;

    private String lastname;

    private Integer age;

    private Date dateOfBirth;

}
