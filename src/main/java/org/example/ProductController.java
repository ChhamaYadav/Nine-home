package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/detailsRequired")
    public List<ProductRequiredDTO> getDetails(){
        System.out.println("frontned call for http://localhost:8080/api/detailsRequired ");
        return productService.getRequiredDetails();
    }

    @GetMapping("/external/{id}")
    public ResponseEntity<Product> fetchProductById(@PathVariable Long id){
        System.out.println("fontned call for getProductByID  http://localhost:8080/api/{id} ");
        Product product=productService.getDetailsById(id);
        if(product!=null){
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


}
