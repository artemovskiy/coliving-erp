package site.artemovskiy.colivingerp.modules.service.authorization;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.JWTProcessor;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Principal;
import java.text.ParseException;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JwtAuthenticationMiddleware extends OncePerRequestFilter {

    private static Pattern bearerAuthPattern = Pattern.compile("^Bearer (.+)$");
    private JWTProcessor<com.nimbusds.jose.proc.SecurityContext> jwtProcessor;

    protected JwtAuthenticationMiddleware(JWTProcessor<com.nimbusds.jose.proc.SecurityContext> jwtProcessor) {
        this.jwtProcessor = jwtProcessor;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {

        HttpServletRequest req = request;

        String authorizationHeader = req.getHeader("authorization");
        if(authorizationHeader == null) {
            chain.doFilter(request, response);
            return;
        }
        Matcher matcher = bearerAuthPattern.matcher(authorizationHeader);
        if (matcher.matches()) {
            String bearerToken = matcher.group(1);

            System.out.println("Logging Request bearer token: " + bearerToken);

            JWTClaimsSet claimsSet;
            com.nimbusds.jose.proc.SecurityContext ctx = null;
            try {
                claimsSet = jwtProcessor.process(bearerToken, ctx);

                SecurityContext context = SecurityContextHolder.createEmptyContext();
                Principal principal = new MyPrincipal(claimsSet.getSubject());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(principal, null, Collections.singleton(new SimpleGrantedAuthority("any")));
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
            } catch (ParseException | BadJOSEException e) {
                // Invalid token
                System.err.println(e.getMessage());
            } catch (JOSEException e) {
                // Key sourcing failed or another internal exception
                System.err.println(e.getMessage());
            }


        }
        chain.doFilter(request, response);
    }
}