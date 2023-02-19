package com.example.BBGG_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BbggBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BbggBackendApplication.class, args);
	}

}
