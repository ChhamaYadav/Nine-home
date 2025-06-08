package org.example;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/filter")
public class FilterController {

    ProductService productService;

    @GetMapping("/products")
    public String getFilteredProducts(
            @RequestParam(required = false) List<String> gender,
            @RequestParam(required = false) List<String> bagType,
            @RequestParam(required = false) List<String> size,
            @RequestParam(required = false) List<String> occasion,
            @RequestParam(required = false) String budget,
            Model model
    ){
        List<Product> products=productService.getFilteredProducts(gender,bagType,size,occasion,budget);
        model.addAttribute("products",products);// Also send back filter values to pre-check checkboxes
        model.addAttribute("selectedGenders",gender);
        model.addAttribute("selectedBagTypes",bagType);
        model.addAttribute("selectedSizes",size);
        model.addAttribute("selectedOccasions",occasion);
        model.addAttribute("selectedPriceRange",budget);

        return "products";//products.html


    }
}
