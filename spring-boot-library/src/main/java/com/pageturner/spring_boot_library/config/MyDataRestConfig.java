package com.pageturner.spring_boot_library.config;

import com.pageturner.spring_boot_library.entity.Book;
import com.pageturner.spring_boot_library.entity.Message;
import com.pageturner.spring_boot_library.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.repository.config.RepositoryConfiguration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "http://localhost:3000";

    /**
     * Customize the behavior of Spring Data Rest and configure CORS for the API
     * @param config used to customize the behavior of Spring Data REST APIs
     * @param cors part of the Spring Framework, is used to configure CORS(cross-origin resource sharing) settings
     *             With this param, we can define which external domains(origins) are allowed to access the API, which
     *             HTTP methods(GET/POST/PUT/DELETE) are permitted and which headers can be included in the requests
     */
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                      CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.DELETE,
                HttpMethod.PATCH
        };

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);

        disableHttpMethods(Book.class,config,theUnsupportedActions);
        disableHttpMethods(Review.class,config,theUnsupportedActions);
        disableHttpMethods(Message.class,config,theUnsupportedActions);

        // bec the front end and backend are in different domains
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);

    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metadata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions)));

    }

}
