package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Brand;
@Repository
public interface BrandRepo extends JpaRepository<Brand,Integer> {
}
