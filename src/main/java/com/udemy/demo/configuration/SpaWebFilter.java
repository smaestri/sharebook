package com.udemy.demo.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;

public class SpaWebFilter extends OncePerRequestFilter {

    /**
     * Forwards any unmapped paths (except those containing a period) to the client {@code index.html}.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        String path = request.getRequestURI();
        if (
            !path.startsWith("/isConnected") &&  !path.startsWith("/users") && !path.startsWith("/books") && !path.startsWith("/borrows") && !path.startsWith("/categories") && !path.startsWith("/authenticate")  &&
                !path.startsWith("/management") &&
                !path.startsWith("/v3/api-docs") &&
                !path.contains(".") &&
                path.matches("/(.*)")
        ) {
            request.getRequestDispatcher("/index.html").forward(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
