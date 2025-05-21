package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        System.out.println("frontend call for http://localhost:8080/api/detailsRequired ");
        return productService.getRequiredDetails();
    }

    @GetMapping("/external/{id}")
    public ResponseEntity<Product> fetchProductById(@PathVariable Long id){
        System.out.println("frontend call for getProductByID  http://localhost:8080/api/{id} ");
        Product product=productService.getDetailsById(id);
        if(product!=null){
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<String> addToCartAPI(@RequestBody Product product){
        System.out.println("call for add to cart http://localhost:8082/cart/add");
       Map<String,Object> requestBody=new HashMap<>();
       requestBody.put("productId",product.getProductId());
       requestBody.put("productName",product.getProductName());
       requestBody.put("price",product.getProductPrice());
       requestBody.put("imageUrl",product.getProductimage_URL());
       requestBody.put("userId",12);
       requestBody.put("quantity",1);

       RestTemplate restTemplate=new RestTemplate();
       String cartapiUrl="http://localhost:8082/cart/add";

       ResponseEntity<String> response=restTemplate.postForEntity(cartapiUrl,requestBody, String.class);
       return ResponseEntity.status(response.getStatusCode()).body(response.getBody());

    }


}
