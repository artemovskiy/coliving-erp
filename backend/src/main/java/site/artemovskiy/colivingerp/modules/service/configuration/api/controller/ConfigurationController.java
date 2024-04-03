package site.artemovskiy.colivingerp.modules.service.configuration.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.artemovskiy.colivingerp.modules.service.configuration.api.dto.ServicePublicConfigDTO;
import site.artemovskiy.colivingerp.modules.service.configuration.config.OIDCConfig;
import site.artemovskiy.colivingerp.modules.service.configuration.config.WebConfig;

@RequestMapping("service/configuration")
@RestController
public class ConfigurationController {
    @Autowired
    private WebConfig webConfig;

    @Autowired
    private OIDCConfig oidcConfig;

    @GetMapping
    public ResponseEntity<ServicePublicConfigDTO> get() {
        ServicePublicConfigDTO dto = new ServicePublicConfigDTO();
        dto.baseUrl = webConfig.getBaseUrl();
        dto.oidc = new ServicePublicConfigDTO.ServicePublicOIDCConfigDTO();
        dto.oidc.clientId = oidcConfig.getClientId();
        ;
        dto.oidc.providerUrl = oidcConfig.getProviderUrl();
        return ResponseEntity.ok(dto);
    }
}
