package com.ahhp.notifier.config;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.ahhp.notifier.utils.JwtUtils;

import javax.servlet.http.Cookie;

import java.util.regex.Pattern;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // bypass Filter if createaccount or validatepassword
        String requestURI = request.getRequestURI();
        boolean matchedH2 = Pattern.compile("/h2*").matcher(requestURI).matches();
        if (requestURI.equals("/v1/createaccount") || requestURI.equals("/v1/validatepassword") || requestURI.equals("/v1/validateemail") || matchedH2) {
            filterChain.doFilter(request, response);
            return;
        }

        // get token from Cookies (in the header)
        Cookie[] cookies = request.getCookies();
        String token = "";
        for(Cookie c : cookies){
            if("Authorization".equals(c.getName())) {
                token = c.getValue();
                System.out.println("token found");
                System.out.println(token);
            }
        }

        // validate token
        JwtUtils jwt = new JwtUtils(token);

        if (jwt.validateJWT()) {

            // token is validated

            System.out.println("token validated");

            // get email from token
            String email = jwt.decodeJWT();

            // set user info to the context
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, null, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // proceed to the next API
            filterChain.doFilter(request, response);

        } else {

            // token not validated --  expired or not valid or empty
            response.setStatus(401);

            // create token
            Cookie cookie = new Cookie("Authorization", null);
            cookie.setPath("/");  // The cookie is visible to all the pages in the directory you specify, and all the pages in that directory's subdirectories
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

        }

    }


}