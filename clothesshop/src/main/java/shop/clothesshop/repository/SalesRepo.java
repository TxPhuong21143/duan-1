package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Sales;

import java.util.List;

@Repository
public interface SalesRepo extends JpaRepository<Sales, Integer> {

    @Query(value = "select * from Sales where salesstatusid in (1,2)", nativeQuery = true)
    public List<Sales> getAllOfBillWithoutOff();

    @Query(value = "select count(*) from sales where salesstatusid =1 or salesstatusid =2", nativeQuery = true)
    public Integer salesUsingTotal();

    @Query(nativeQuery = true, value = "select * from sales where saletypeid =2")
    public List<Sales> getVoucher();

    @Query(nativeQuery = true, value = "select * from sales where saletypeid =1")
    public List<Sales> getShipVoucher();
}
