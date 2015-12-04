package net.mzouabi.ng2.server.dto;

/**
 * Created by mouradzouabi on 04/12/15.
 */
public class PersonDTO{

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
