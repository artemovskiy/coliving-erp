package site.artemovskiy.colivingerp.sandbox;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.security.Principal;

public class AuthenticatedHttpRequest extends HttpServletRequestWrapper {


    private Principal principal;
    protected AuthenticatedHttpRequest(HttpServletRequest req, Principal principal) {
        super(req);
        this.principal = principal;
    }

    @Override
    public Principal getUserPrincipal() {
        return principal;
    }
}
