package net.mzouabi.ng2.server.config.mvc;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
public class RepositoryRestMvcConfig extends RepositoryRestMvcConfiguration {

	private static final String MY_BASE_URI_URI = "/crud";

	@Override
	protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		super.configureRepositoryRestConfiguration(config);
		config.setBasePath(MY_BASE_URI_URI);
	}

}
