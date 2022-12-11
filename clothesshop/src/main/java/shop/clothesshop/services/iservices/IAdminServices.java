package shop.clothesshop.services.iservices;

import org.springframework.web.multipart.MultipartFile;
import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.Bill;
import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.Sales;
import shop.clothesshop.entities.adminrequest.CreateAndRemakePropertyData;
import shop.clothesshop.entities.adminrequest.CreateProductData;
import shop.clothesshop.entities.adminrequest.HoldBillRequestPayBill;
import shop.clothesshop.entities.adminrespon.*;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface IAdminServices {
    public PropertyObject getPropertyObject();

    public CreateAndRemakePropertyData createProperty(CreateAndRemakePropertyData createAndRemakePropertyData);

    public CreateAndRemakePropertyData remakeProperty(CreateAndRemakePropertyData createAndRemakePropertyData);

    public void addProduct(MultipartFile file1, MultipartFile file2, CreateProductData data) throws IOException;

    public List<Product> getByListId(Set<Integer> listId);

    public List<Product> getAllProduct();

    public Product remakeProduct(Product p);

    public Bill payBillInShop(AccountShipContact contact, int idEmployee, int billId);

    public Bill createBillInShop(int idEmployee);

    public void removeHodlingBillDetail(int idBillDetail);

    public List<Bill> getAllHoldingBill();

    public Product findProductById(Integer idProduct);

    public HoldBill getAllBillDetailOfBill(Integer idBill);

    public void addProduct2BillDetail(Integer idProduct, Integer idBill);

    public void deleteBillDetail(Integer idBillDetail);

    public void updateQuantityBillDetail(Integer idBillDetail, Integer quantity);

    public Double sumBill(Integer billId);

    public void payHoldBill(HoldBillRequestPayBill holdBillRequestPayBill);

    public PrintBillData printBillData(Integer idBill);
    public AnalysisObject analysisShop12Month();
    public void adminSetBill(int opt, int billId, int idEmployee);
    public List<BillAnalysis> getAllBillByType(int type);
    public List<Product> searchInShop(String search);

    public SalesObject getAllSales();

    public void createVoucher(Sales data);

    public void closeVoucher(int idVoucher);
}