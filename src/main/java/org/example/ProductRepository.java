package org.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(value = "SELECT * FROM products WHERE " +
            "(:gender IS NULL OR gender IN (:gender)) AND " +
            "(:bagType IS NULL OR bag_type IN (:bagType)) AND " +
            "(:size IS NULL OR size IN (:size)) AND " +
            "(:occasion IS NULL OR occasion IN (:occasion)) AND " +
            "(" +
            "(:budget = 'under-1000' AND productPrice < 1000) OR " +
            "(:budget = '1000-2000' AND productPrice BETWEEN 1000 AND 2000) OR " +
            "(:budget = 'above-2000' AND productPrice > 2000) OR " +
            ":budget IS NULL" +
            ")",
            nativeQuery = true)
    List<Product> findFilteredProducts(
            List<String> gender,
            List<String> bagType,
            List<String> size,
            List<String> occasion,
            String budget);
}
