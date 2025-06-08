package org.example;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/filter")
public class FilterController {

    @Autowired
    private final ProductService productService;

    public FilterController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getFilteredProducts(
            @RequestParam(required = false) List<String> gender,
            @RequestParam(required = false) List<String> bagType,
            @RequestParam(required = false) List<String> size,
            @RequestParam(required = false) List<String> occasion,
            @RequestParam(required = false) String budget,
            Model model
    ){
        return productService.getFilteredProducts(gender, bagType, size, occasion, budget);
    }
}
