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

@Component
public class JwtRequestFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // get token from header
        final String token = request.getHeader("Authorization");
        System.out.println(token);

        JwtUtils jwt = new JwtUtils(token);

        System.out.println(jwt.decodeJWT());

//        // check if token is expired or not
//        // try catch create Claims
          // if expired, return 401
//        response.setStatus(401);
//        return;
          // return
//
        // if token is not expired
        // check if token is validated
        // if validated, do the followings
            // final String email = decodeJWT(token)
            // create new user
            String email = "phuoc@fulbright.edu.vn";
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, null);

            // set user info to the context
            SecurityContextHolder.getContext().setAuthentication(authentication);

        // proceed to the next API
        filterChain.doFilter(request, response);

        // otherwise, do nothing
    }


}