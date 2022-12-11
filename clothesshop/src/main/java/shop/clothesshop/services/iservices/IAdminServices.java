package shop.clothesshop.services.iservices;


import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.Sales;
import shop.clothesshop.entities.adminrespon.AnalysisObject;
import shop.clothesshop.entities.adminrespon.BillAnalysis;
import shop.clothesshop.entities.adminrespon.SalesObject;

import java.util.List;

public interface IAdminServices {
    public AnalysisObject analysisShop12Month();
    public void adminSetBill(int opt, int billId, int idEmployee);
    public List<BillAnalysis> getAllBillByType(int type);
    public List<Product> searchInShop(String search);

    public SalesObject getAllSales();

    public void createVoucher(Sales data);

    public void closeVoucher(int idVoucher);
}
