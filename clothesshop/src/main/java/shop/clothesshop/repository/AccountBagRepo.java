package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.AccountBag;
import shop.clothesshop.entities.responobject.ShowAccountBag;

import java.util.List;

@Repository
public interface AccountBagRepo extends JpaRepository<AccountBag,Integer> {
    public List<AccountBag> findByAccountId(int accountId);
}
