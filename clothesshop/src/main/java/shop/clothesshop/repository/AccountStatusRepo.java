package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.AccountStatus;
@Repository
public interface AccountStatusRepo extends JpaRepository<AccountStatus,Integer> {
}
