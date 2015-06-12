package net.mzouabi.ng2.server.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	@RequestMapping("/swagger-ui")
	public String getSwaggerUIPage() {
		return "swagger";
	}

}
