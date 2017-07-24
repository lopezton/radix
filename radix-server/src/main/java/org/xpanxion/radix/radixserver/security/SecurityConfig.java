package org.xpanxion.radix.radixserver.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.xpanxion.radix.radixserver.conf.CustomCorsFilter;
import org.xpanxion.radix.radixserver.security.jwt.JwtAuthenticationProvider;
import org.xpanxion.radix.radixserver.security.jwt.JwtTokenAuthenticationProcessingFilter;
import org.xpanxion.radix.radixserver.security.jwt.SkipPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    public static final String JWT_TOKEN_HEADER_PARAM = "X-Authorization";
    
    @Value("${app.security.entrypoint.login}")
    @Getter
    private String loginEntryPoint;
    
    @Value("${app.security.entrypoint.refresh}")
    @Getter
    private String refreshEntryPoint;
    
    @Value("${app.security.entrypoint.requiresauth}")
    @Getter
    private String requiresAuthEntryPoint;
    
    @Autowired
    private RestAuthenticationEntryPoint authenticationEntryPoint;
    
    @Autowired
    private AuthenticationSuccessHandler successHandler;
    
    @Autowired
    private AuthenticationFailureHandler failureHandler;
    
    @Autowired
    private AjaxAuthenticationProvider ajaxAuthenticationProvider;
    
    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;
    
    @Autowired
    private TokenExtractor tokenExtractor;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private ObjectMapper objectMapper;
        
    protected AjaxLoginProcessingFilter buildAjaxLoginProcessingFilter() throws Exception {
        AjaxLoginProcessingFilter filter = new AjaxLoginProcessingFilter(this.loginEntryPoint, successHandler, failureHandler, objectMapper);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }
    
    protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter() throws Exception {
        List<String> pathsToSkip = Arrays.asList(this.refreshEntryPoint, this.loginEntryPoint);
        SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(pathsToSkip, this.requiresAuthEntryPoint);
        JwtTokenAuthenticationProcessingFilter filter 
            = new JwtTokenAuthenticationProcessingFilter(failureHandler, tokenExtractor, matcher);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(ajaxAuthenticationProvider);
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .csrf().disable() // We don't need CSRF for JWT based authentication
        .exceptionHandling()
        .authenticationEntryPoint(this.authenticationEntryPoint)
        
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        .and()
            .authorizeRequests()
                .antMatchers(this.loginEntryPoint).permitAll() // Login end-point
                .antMatchers(this.refreshEntryPoint).permitAll() // Token refresh end-point
        .and()
            .authorizeRequests()
                .antMatchers(this.requiresAuthEntryPoint).authenticated() // Protected API End-points
        .and()
            .addFilterBefore(new CustomCorsFilter(), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(buildAjaxLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
