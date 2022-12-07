package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.BuyMethod;
@Repository
public interface BuyMethodRepo extends JpaRepository<BuyMethod,Integer> {
}
