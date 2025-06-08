package org.example;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/filter")
public class FilterController {

    ProductService productService;

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
