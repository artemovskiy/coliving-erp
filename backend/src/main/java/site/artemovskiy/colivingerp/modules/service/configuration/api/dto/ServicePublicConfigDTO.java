package site.artemovskiy.colivingerp.modules.service.configuration.api.dto;

public class ServicePublicConfigDTO {
    public String baseUrl;

    public ServicePublicOIDCConfigDTO oidc;

    public static class ServicePublicOIDCConfigDTO {
        public String clientId;

        public String providerUrl;
    }
}
