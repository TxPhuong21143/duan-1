package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.ProductImg;
@Repository
public interface ProductImgRepo extends JpaRepository<ProductImg,Integer> {
}
