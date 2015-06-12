package com.atexo.referentiel.server.repository;

import javax.transaction.Transactional;

import net.mzouabi.ng2.server.repository.PersonRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/root-applicationContext.xml", "/data-applicationContext.xml" })
@TransactionConfiguration(defaultRollback = false)
@Transactional()
public class ReferentielRepositoryTest {

	final static Logger loggger = LoggerFactory.getLogger(ReferentielRepositoryTest.class);

	@Autowired
	PersonRepository fr;

	@Test
	public void test() {

	}

	public void test2() {

	}
}
