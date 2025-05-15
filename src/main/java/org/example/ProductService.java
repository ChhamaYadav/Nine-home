package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public ProductService(ProductRepository productRepository, RestTemplate restTemplate) {
        this.productRepository = productRepository;
        this.restTemplate = restTemplate;
    }

    public List<Product> getAllProducts(){
        String url="http://localhost:8081/api/products/showAll";
        Product[] productArray=restTemplate.getForObject(url,Product[].class);

        List<Product> productsList= Arrays.asList(productArray);
        System.out.println("fetched from 8081 db : "+ productsList.size());
        return productsList;
    }
}
