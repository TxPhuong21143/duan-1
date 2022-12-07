package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.CategoryType;
@Repository
public interface CategoryRepo extends JpaRepository<CategoryType,Integer> {
}
