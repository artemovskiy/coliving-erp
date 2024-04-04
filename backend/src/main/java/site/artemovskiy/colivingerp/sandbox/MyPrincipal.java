package site.artemovskiy.colivingerp.sandbox;

import javax.security.auth.Subject;
import java.security.Principal;

public class MyPrincipal implements Principal {

    private String name;

    public MyPrincipal(String name) {
        this.name = name;
    }
    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public boolean implies(Subject subject) {
        return Principal.super.implies(subject);
    }
}
