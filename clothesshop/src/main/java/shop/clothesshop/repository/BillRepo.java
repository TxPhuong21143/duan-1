package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Bill;

import java.util.List;

@Repository
public interface BillRepo extends JpaRepository<Bill, Integer> {
    @Query(nativeQuery = true, value = "select count(*) from bill where MONTH(bill.createdate) = :month")
    public Integer countBillInMonth(@Param("month") int month);

    @Query(nativeQuery = true, value = "select count(*) from bill where billstatusid=3 and MONTH(createdate) = :month")
    public Integer countShippedBillByMonth(@Param("month") int month);

    @Query(nativeQuery = true, value = "select sum(quantity) from billdetail join bill on bill.billid = billdetail.billid where bill.billstatusid =3 and MONTH(createdate) = :month")
    public Integer soldTotalByMonth(@Param("month") int month);

    @Query(nativeQuery = true, value = "select sum(price*quantity)")
    public Double profitbeforeBillBack(@Param("month") int month);

    @Query(nativeQuery = true, value = "select * from bill where month(createdate) = :month and billstatusid =3")
    public List<Bill> getAllBillShippedInMonth(@Param("month") int month);

    @Query(nativeQuery = true, value = "select count(*) from bill where billstatusid = 5 and month(createdate) = :month")
    public Integer totalBillBack(@Param("month") int month);

    @Query(nativeQuery = true, value = "select sum(shipprice) from bill where month(createdate) = :month and billstatusid =5")
    public Double totalShipLoss(@Param("month") int month);

    @Query(nativeQuery = true, value = "select  * from bill where billstatusid =1")
    public List<Bill> getAllBillWaitting();

    @Query(nativeQuery = true, value = "select  * from bill where billstatusid =2")
    public List<Bill> getAllBillShipping();

    @Query(nativeQuery = true, value = "select  * from bill where billstatusid =3")
    public List<Bill> getAllBillShipped();

    @Query(nativeQuery = true, value = "select  * from bill where billstatusid = 7 order by billid desc")
    public List<Bill> getAllHoldingBill();
}
