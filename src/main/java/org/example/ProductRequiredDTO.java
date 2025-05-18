package org.example;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequiredDTO {
    private String productName;
    private double ProductPrice;
    private String productimageURL;
    private Long productId;
}
