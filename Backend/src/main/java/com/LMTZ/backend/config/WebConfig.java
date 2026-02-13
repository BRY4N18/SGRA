package com.LMTZ.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final DbRoleInterceptor dbRoleInterceptor;

    public WebConfig(DbRoleInterceptor dbRoleInterceptor) {
        this.dbRoleInterceptor = dbRoleInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(dbRoleInterceptor)
                .addPathPatterns("/api/**");
    }
}
