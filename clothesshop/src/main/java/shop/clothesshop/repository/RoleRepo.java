package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.Role;
@Repository
public interface RoleRepo extends JpaRepository<Role,Integer> {
}
