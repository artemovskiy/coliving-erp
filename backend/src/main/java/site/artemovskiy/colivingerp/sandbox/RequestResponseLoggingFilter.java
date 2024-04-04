package site.artemovskiy.colivingerp.sandbox;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.JWTProcessor;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.Principal;
import java.text.ParseException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RequestResponseLoggingFilter implements Filter {

    private static Pattern bearerAuthPattern = Pattern.compile("^Bearer (.+)$");
    private JWTProcessor<SecurityContext> jwtProcessor;

    protected RequestResponseLoggingFilter(JWTProcessor<SecurityContext> jwtProcessor) {
        this.jwtProcessor = jwtProcessor;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws ServletException, IOException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String authorizationHeader = req.getHeader("authorization");
        Matcher matcher = bearerAuthPattern.matcher(authorizationHeader);
        if (matcher.matches()) {
            String bearerToken = matcher.group(1);

            System.out.println("Logging Request bearer token: " + bearerToken);

            JWTClaimsSet claimsSet;
            SecurityContext ctx = null;
            try {
                claimsSet = jwtProcessor.process(bearerToken, ctx);
                Principal principal = new MyPrincipal("aboba");
                chain.doFilter(new AuthenticatedHttpRequest(req, principal), response);
                return;
            } catch (ParseException | BadJOSEException e) {
                // Invalid token
                System.err.println(e.getMessage());
                return;
            } catch (JOSEException e) {
                // Key sourcing failed or another internal exception
                System.err.println(e.getMessage());
                return;
            }


        }
        chain.doFilter(request, response);

    }
}