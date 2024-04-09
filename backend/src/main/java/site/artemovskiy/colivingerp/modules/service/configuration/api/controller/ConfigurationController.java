package site.artemovskiy.colivingerp.modules.service.configuration.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.artemovskiy.colivingerp.modules.service.configuration.api.dto.ServicePublicConfigDTO;
import site.artemovskiy.colivingerp.modules.service.configuration.config.OIDCConfig;
import site.artemovskiy.colivingerp.modules.service.configuration.config.WebConfig;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
@RequestMapping("service/configuration")
@RestController
public class ConfigurationController {
    @Autowired
    private WebConfig webConfig;

    @Autowired
    private OIDCConfig oidcConfig;

    @Autowired
    private OAuth2ResourceServerProperties oAuth2ResourceServerProperties;

    @GetMapping
    public ResponseEntity<ServicePublicConfigDTO> get() {
        ServicePublicConfigDTO dto = new ServicePublicConfigDTO();
        dto.baseUrl = webConfig.getBaseUrl();
        dto.oidc = new ServicePublicConfigDTO.ServicePublicOIDCConfigDTO();
        dto.oidc.clientId = oidcConfig.getClientId();
        dto.oidc.providerUrl = oAuth2ResourceServerProperties.getJwt().getIssuerUri();
        return ResponseEntity.ok(dto);
    }
}
