package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Product;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query(value = "select top 12 * from product ", nativeQuery = true)
    public List<Product> getProductHome();

    @Query(value = "select count(*) from product where productstatusid =1", nativeQuery = true)
    public Integer productShellingTotal();

    @Query(value = "select sum(product.quantity) from product where productstatusid=1", nativeQuery = true)
    public Integer countProductInventory();

    @Query(nativeQuery = true, value = "select productid from billdetail join bill on billdetail.billid = bill.billid where MONTH(bill.createdate) = MONTH(CURDATE()) and bill.billstatusid = 3 group by productid order by SUM(quantity) DESC limit 5")
    public List<Integer> top5ProductSold();

    @Query(nativeQuery = true, value = "select * from product where categorytypeid =1 limit 12")
    public List<Product> dressCategory();

    @Query(nativeQuery = true, value = "select * from product where categorytypeid =2 limit 12")
    public List<Product> panCategory();

    @Query(nativeQuery = true, value = "select * from product where categorytypeid =3 limit 12")
    public List<Product> shirtCategory();

    @Query(nativeQuery = true, value = "select * from product where productdetail like %:searchInput%")
    public List<Product> searchProduct(@Param("searchInput") String searchInput);

    @Query(nativeQuery = true, value = "select * from product where productdetail like %:searchInput% limit 5")
    public List<Product> searchProductTop5(@Param("searchInput") String searchInput);

}
