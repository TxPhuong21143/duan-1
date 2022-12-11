package shop.clothesshop.services.iservices;

import shop.clothesshop.entities.*;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.OrderData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.*;

import java.util.List;

public interface IAppServices {
    public List<Product> getProductHome();

    public ProductDetail getProductId(int accountId);

    public List<ShowAccountBag> getProductBagByAccountID(int accountId);

    public List<OrderObject> getOrderObjectByAccountId(int accountId);

    public AccountCustom checkLogin(String useName, String userPass);

    public AccountCustom getAccountContacts(int accountId);

    public AccountBag addProduct2Bag(int accountId, int productId, int quantity);

    public AccountBag deleteAccountBag(int accountBagId);

    public CreateOrder createOrder(Integer[] listIdAccountBag);

    public CreateAccountData createAccountAndAccountShipContact(CreateAccountData accountData);

    public AccountBag updateAccountBag(Integer[] accountBagData);

    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact);

    public OrderData createBill(OrderData orderData);

    public Bill cancelBill(Integer billId, Integer type);

    public AccountShipContact removeAccountShipContact(Integer idAccountShipContact);

    public RemakeAccountRequest remakeAcountInfo(RemakeAccountRequest accountRemake);

    public RePassRespon rePass(RePass rePassData);

    public List<Product> nextPage(int page);

    public List<Product> dressCategory();

    public List<Product> panCategory();

    public List<Product> shirtCategory();

    public List<Product> searchProduct(String searchInput);

}
