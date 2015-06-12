package net.mzouabi.ng2.server.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import net.mzouabi.ng2.server.model.QPerson;

import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;

public class PersonRepositoryImpl implements PersonRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@Override
	public int countCustom() {
		JPQLQuery query = new JPAQuery(em);
		return (int) query.from(QPerson.person).where(QPerson.person.id.isNotNull()).count();
	}

}
