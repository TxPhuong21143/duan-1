package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Producer;
@Repository
public interface ProducerRepo extends JpaRepository<Producer,Integer> {
}
