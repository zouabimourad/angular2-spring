package net.mzouabi.ng2.server.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
public class Person extends AbstractEntity {

	private static final long serialVersionUID = -6321180910534044216L;

	String firstname;

	String lastname;

	Integer age;

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}
}
