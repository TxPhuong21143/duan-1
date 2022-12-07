package shop.clothesshop.services.iservices;


import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.adminrespon.BillAnalysis;

import java.util.List;

public interface IAdminServices {

    public void adminSetBill(int opt, int billId, int idEmployee);
    public List<BillAnalysis> getAllBillByType(int type);
    public List<Product> searchInShop(String search);

}
