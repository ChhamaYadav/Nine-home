package org.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p FROM Product p WHERE " +
            "(:gender IS NULL OR p.gender IN :gender) AND " +
            "(:bagType IS NULL OR p.bagType IN :bagType) AND " +
            "(:size IS NULL OR p.size IN :size) AND " +
            "(:occasion IS NULL OR p.occasion IN :occasion) AND " +
            "(" +
            "(:budget = 'under-1000' AND p.price < 1000) OR " +
            "(:budget = '1000-2000' AND p.price BETWEEN 1000 AND 2000) OR " +
            "(:budget = 'above-2000' AND p.price > 2000) OR " +
            ":budget IS NULL" +
            ")")
    List<Product> findFilteredProducts(
            List<String> gender,
            List<String> bagType,
            List<String> size,
            List<String> occasion,
            String budget);
}
