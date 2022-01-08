package com.ahhp.notifier;

import com.ahhp.notifier.controller.JWTDemo;
import io.jsonwebtoken.Claims;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotifierApplication {

	public static void main(String[] args) {

		SpringApplication.run(NotifierApplication.class, args);

		JWTDemo jwtDemo = new JWTDemo();

		String input = "{'email':'hoang@student.edu.vn'}";

		String jwt = jwtDemo.createJWT(input, 69420);

		System.out.println(jwt);

		Claims claims = jwtDemo.decodeJWT(jwt);

		System.out.println(claims);
	}

}
