package site.artemovskiy.colivingerp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("site.artemovskiy.colivingerp.modules.service.configuration.config")
public class ColivingErp {
    public static void main(String[] args) {
        SpringApplication.run(ColivingErp.class);
    }
}