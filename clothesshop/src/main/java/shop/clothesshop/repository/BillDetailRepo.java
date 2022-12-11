package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.BillDetail;

import java.util.List;

@Repository
public interface BillDetailRepo extends JpaRepository<BillDetail, Integer> {
    @Query(nativeQuery = true, value = "select * from billdetail join bill on bill.billid = billdetail.billid where MONTH(bill.createdate) = MONTH(CURDATE()) and productid = :productId and bill.billstatusid = 3")
    public List<BillDetail> allBillDetailOfProductBillShipped(@Param("productId") int productId);

    @Query(nativeQuery = true, value = "select accountid from billdetail join bill on bill.billid=billdetail.billid join accountshipcontact on bill.accountshipcontactid=accountshipcontact.accountshipcontactid where bill.billstatusid = 3 GROUP BY accountid ORDER BY sum(price*quantity) desc limit 5")
    public List<Integer> top5AccountPaid();

    @Query(nativeQuery = true, value = "select sum(quantity*price) from billdetail join bill on bill.billid=billdetail.billid join accountshipcontact on bill.accountshipcontactid=accountshipcontact.accountshipcontactid where bill.billstatusid = 3 and accountid= :idAccount")
    public Double getTotalPaidByIdAccount(@Param("idAccount") int idAccount);
}
