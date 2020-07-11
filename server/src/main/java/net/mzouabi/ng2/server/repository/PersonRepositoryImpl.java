package net.mzouabi.ng2.server.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class PersonRepositoryImpl implements PersonRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

}
