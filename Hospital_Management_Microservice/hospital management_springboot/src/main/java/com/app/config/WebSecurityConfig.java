package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.app.filters.JWTRequestFilter;
import com.app.security.JwtAuthEntryPoint;

@EnableWebSecurity // mandatory
@Configuration // mandatory
@EnableMethodSecurity
public class WebSecurityConfig  {

	@Autowired
	private JWTRequestFilter filter;
	@Autowired
	private JwtAuthEntryPoint jwtAuthEntryPoint;
	
	// configure BCryptPassword encode bean
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// 1. Disable csrf protection
		http.csrf(csrf->csrf.disable());
		
		// 2. Authenticate any request
		http.authorizeHttpRequests(request->
			request
			// 3. permit all - swagger, and related end points
			.requestMatchers(
					new AntPathRequestMatcher("/v3/api-docs/**"),
					new AntPathRequestMatcher("/swagger-ui/**"),
					new AntPathRequestMatcher("/swagger-resources/**"),
					new AntPathRequestMatcher("/webjars/**"),
					new AntPathRequestMatcher("/swagger-ui.html")
					).permitAll()
			// error - public
			.requestMatchers(
					new AntPathRequestMatcher("/error")).permitAll()
			.requestMatchers(
					new AntPathRequestMatcher("/**", HttpMethod.OPTIONS.name())).permitAll()

			.antMatchers("/patient/registerPatient").permitAll()
			.antMatchers("/admin/getAllSpecialization").permitAll()
			.antMatchers("/patient/getDoctorsBySpecialization/**").permitAll()
			.antMatchers("/login").permitAll()
			.antMatchers("/", "/login", "/register").permitAll()

			// Role-based endpoints
			.antMatchers("/admin/**").hasRole("ADMIN")
			.antMatchers("/patient/**").hasRole("PATIENT")
			.antMatchers("/doctor/**").hasRole("DOCTOR")
			.antMatchers("/receptionist/**").hasRole("RECEPTIONIST")
			.antMatchers("/doctor/uploadPrescription/**").hasRole("DOCTOR")
			.antMatchers("/patient/download/**").hasRole("PATIENT")
			
			.anyRequest().authenticated());
		
		// 5. set session creation policy - stateless
		http.sessionManagement(session-> 
			session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		// 6. add custom JWT filter before - UserNamePasswordAuthFilter
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		
		// 7. customize error code of SC 401 | 403, in case of authentication failure
		http.exceptionHandling(ex->ex.authenticationEntryPoint(jwtAuthEntryPoint));
		
		return http.build();
	}

	
	// configure auth mgr bean : to be used in Authentication REST controller
	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}

