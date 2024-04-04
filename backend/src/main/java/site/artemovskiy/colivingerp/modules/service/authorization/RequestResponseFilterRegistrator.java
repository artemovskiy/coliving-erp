package site.artemovskiy.colivingerp.modules.service.authorization;

import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.JWKSourceBuilder;
import com.nimbusds.jose.proc.DefaultJOSEObjectTypeVerifier;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimNames;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTClaimsVerifier;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import com.nimbusds.oauth2.sdk.GeneralException;
import com.nimbusds.oauth2.sdk.id.Issuer;
import com.nimbusds.openid.connect.sdk.op.OIDCProviderMetadata;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import site.artemovskiy.colivingerp.modules.service.configuration.config.OIDCConfig;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

@Component
public class RequestResponseFilterRegistrator {
    private ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();

    private JWKSource<SecurityContext> keySource;
    @Autowired
    private OIDCConfig oidcConfig;

    @PostConstruct
    public void init() throws IOException, GeneralException {
        // The OpenID provider issuer URL
        Issuer issuer = new Issuer(oidcConfig.getProviderUrl());
        OIDCProviderMetadata opMetadata = OIDCProviderMetadata.resolve(issuer);
        System.out.println(opMetadata.toJSONObject());


        jwtProcessor.setJWSTypeVerifier(new DefaultJOSEObjectTypeVerifier<>(new JOSEObjectType("jwt")));

        keySource = JWKSourceBuilder
                .create(opMetadata.getJWKSetURI().toURL())
                .retrying(true)
                .build();
        JWSAlgorithm expectedJWSAlg = JWSAlgorithm.RS256;
        JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(expectedJWSAlg, keySource);
        jwtProcessor.setJWSKeySelector(keySelector);

        jwtProcessor.setJWTClaimsSetVerifier(new DefaultJWTClaimsVerifier<>(
                Collections.singleton("account"),
                new JWTClaimsSet.Builder().issuer(oidcConfig.getProviderUrl()).build(),
                new HashSet<>(Arrays.asList(
                        JWTClaimNames.SUBJECT,
                        JWTClaimNames.ISSUED_AT,
                        JWTClaimNames.EXPIRATION_TIME,
                        JWTClaimNames.JWT_ID)),
                        new HashSet<String>()
                )
        );
    }

    @Bean
    public JwtAuthenticationMiddleware requestResponseLoggingFilter() {
        return new JwtAuthenticationMiddleware(jwtProcessor);
    }

}
