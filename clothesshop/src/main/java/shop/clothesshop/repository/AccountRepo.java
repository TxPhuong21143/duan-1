package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Accounts;

import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Accounts, Integer> {
    @Query(value = "select * from Accounts where accountUserName = :userName and accountPassword= :userPass", nativeQuery = true)
    public Accounts checkLogin(@Param("userName") String userName, @Param("userPass") String userPass);

    @Query(value = "select * from accounts where accountusername = :userName", nativeQuery = true)
    public Optional<Accounts> checkUserName(@Param("userName") String userName);

    @Query(nativeQuery = true, value = "select count(*) from accounts where accountstatusid =1 and roleid = 3")
    public Integer custumerActiveTotal();
}
