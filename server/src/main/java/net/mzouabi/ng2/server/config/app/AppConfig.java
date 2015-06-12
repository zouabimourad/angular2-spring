package net.mzouabi.ng2.server.config.app;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource({ "classpath:/root-applicationContext.xml", "classpath:/data-applicationContext.xml", "classpath:/service-applicationContext.xml" })
public class AppConfig {

}
