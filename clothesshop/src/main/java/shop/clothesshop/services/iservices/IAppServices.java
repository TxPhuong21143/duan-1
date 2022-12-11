package shop.clothesshop.services.iservices;

import shop.clothesshop.entities.AccountBag;
import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.Bill;
import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.OrderData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.*;

import java.util.List;

import java.util.List;

public interface IAppServices {
    public AccountCustom checkLogin(String useName, String userPass);
    public AccountCustom getAccountContacts(int accountId);
<<<<<<< HEAD

=======
>>>>>>> e8d130ecde5ee4188ea48e46bd4c06dc457c3dce
    public CreateAccountData createAccountAndAccountShipContact(CreateAccountData accountData);
    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact);
    public RemakeAccountRequest remakeAcountInfo(RemakeAccountRequest accountRemake);
    public RePassRespon rePass(RePass rePassData);
<<<<<<< HEAD
    public List<Product> getProductHome();

    public ProductDetail getProductId(int accountId);

    public List<ShowAccountBag> getProductBagByAccountID(int accountId);

    public List<OrderObject> getOrderObjectByAccountId(int accountId);
=======
    public Bill cancelBill(Integer billId, Integer type);
    public OrderData createBill(OrderData orderData);

>>>>>>> e8d130ecde5ee4188ea48e46bd4c06dc457c3dce

    public AccountBag addProduct2Bag(int accountId, int productId, int quantity);

    public AccountBag deleteAccountBag(int accountBagId);

    public CreateOrder createOrder(Integer[] listIdAccountBag);
<<<<<<< HEAD

    public AccountBag updateAccountBag(Integer[] accountBagData);

    public OrderData createBill(OrderData orderData);

    public Bill cancelBill(Integer billId, Integer type);

    public AccountShipContact removeAccountShipContact(Integer idAccountShipContact);

    public List<Product> nextPage(int page);

    public List<Product> dressCategory();

    public List<Product> panCategory();

    public List<Product> shirtCategory();

    public List<Product> searchProduct(String searchInput);
=======
>>>>>>> e8d130ecde5ee4188ea48e46bd4c06dc457c3dce
}
