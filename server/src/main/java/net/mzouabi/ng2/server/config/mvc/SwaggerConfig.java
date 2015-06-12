package net.mzouabi.ng2.server.config.mvc;

import static springfox.documentation.builders.PathSelectors.regex;
import net.mzouabi.ng2.server.config.ConfigConstants;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import com.google.common.base.Predicate;

@Configuration
@EnableSwagger2
@Profile(ConfigConstants.PROFILE_SWAGGER_UI)
public class SwaggerConfig {

	@Bean
	public Docket swaggerSpringMvcPlugin() {
		return new Docket(DocumentationType.SWAGGER_2).groupName("webservice-api").select()

		.paths(paths()) // and by paths
				.build().apiInfo(apiInfo());
	}

	private Predicate<String> paths() {
		return regex("/.*");
	}

	private ApiInfo apiInfo() {
		ApiInfo apiInfo = ApiInfo.DEFAULT;
		return apiInfo;
	}
}