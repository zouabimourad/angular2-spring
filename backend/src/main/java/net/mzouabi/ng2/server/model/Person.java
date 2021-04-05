package net.mzouabi.ng2.server.model;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class Person extends AbstractEntity {

    private static final long serialVersionUID = -6321180910534044216L;

    private String firstname;

    private String lastname;

    private Integer age;

}
