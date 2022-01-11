package com.ahhp.notifier;

import com.ahhp.notifier.utils.JwtUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotifierApplication {

	public static void main(String[] args) {

		SpringApplication.run(NotifierApplication.class, args);
//
//		JwtUtils jwtDemo = new JwtUtils();
////
//		String input = "{'email':'hoang@student.edu.vn'}";
////
//		String jwt = jwtDemo.createJWT(input, 878878778);
////
//		System.out.println(jwt);

//		Claims claims = jwtDemo.decodeJWT(jwt);
//		System.out.println(claims);
	}

}
