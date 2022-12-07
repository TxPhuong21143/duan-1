package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.AccountShipContact;

import java.util.List;

@Repository
public interface AccountShipContactRepo extends JpaRepository<AccountShipContact, Integer> {
    @Query(value = "select * from accountshipcontact where accountid = :accountId and accountshipcontactstatusid = 1", nativeQuery = true)
    public List<AccountShipContact> getAccountShipContactOn(@Param("accountId") int accountId);
}
