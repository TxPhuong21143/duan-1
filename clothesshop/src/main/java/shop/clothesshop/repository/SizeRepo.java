package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Size;
@Repository
public interface SizeRepo extends JpaRepository<Size,Integer> {
}
