package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.ProductStatus;

@Repository
public interface ProductStatusRepo extends JpaRepository<ProductStatus, Integer> {
}
