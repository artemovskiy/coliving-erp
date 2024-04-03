package site.artemovskiy.colivingerp.modules.service.configuration.config;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "web")
@ConfigurationPropertiesScan
@Validated
public class WebConfig {
    @URL
    @NotBlank
    public String baseUrl;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
}