package shop.clothesshop.services.iservices;

import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.Bill;
import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.OrderData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.AccountCustom;
import shop.clothesshop.entities.responobject.RePassRespon;

import java.util.List;

public interface IAppServices {
    public AccountCustom checkLogin(String useName, String userPass);
    public AccountCustom getAccountContacts(int accountId);
    public CreateAccountData createAccountAndAccountShipContact(CreateAccountData accountData);
    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact);
    public RemakeAccountRequest remakeAcountInfo(RemakeAccountRequest accountRemake);
    public RePassRespon rePass(RePass rePassData);
    public Bill cancelBill(Integer billId, Integer type);
    public OrderData createBill(OrderData orderData);
    public List<Product> getProductHome();
    public List<Product> nextPage(int page);
    public List<Product> dressCategory();
    public List<Product> panCategory();
    public List<Product> shirtCategory();
    public List<Product> searchProduct(String searchInput);
}
