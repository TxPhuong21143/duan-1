package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.ShipMethod;
@Repository
public interface ShipMethodRepo extends JpaRepository<ShipMethod,Integer> {
}
