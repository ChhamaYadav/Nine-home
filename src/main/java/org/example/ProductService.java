package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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

    public List<ProductRequiredDTO> getRequiredDetails() {
        String url="http://localhost:8081/api/products/getRequiredDetails";
        ProductRequiredDTO[] details=restTemplate.getForObject(url, ProductRequiredDTO[].class);

        List<ProductRequiredDTO> detailsList=Arrays.asList(details);
        System.out.println("fetched required details from 8081");
        return detailsList;
    }

    public Product getDetailsById(Long id){
        String url= "http://localhost:8081/api/products/"+id;
        return restTemplate.getForObject(url,Product.class);
    }

    public ResponseEntity<Map<String, Object>> getCartItemsDetails() {
        return null;
    }

    public List<Product> getFilteredProducts(List<String> gender, List<String> bagType, List<String> size, List<String> occasion, String budget) {
        return productRepository.findFilteredProducts(gender, bagType, size, occasion, budget);
    }

}























