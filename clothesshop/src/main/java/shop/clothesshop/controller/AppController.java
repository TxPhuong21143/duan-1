package shop.clothesshop.controller;

import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shop.clothesshop.entities.*;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.OrderData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.*;
import shop.clothesshop.lib.GsonMix;
import shop.clothesshop.services.AppServices;

import java.util.List;

@RestController
@RequestMapping(value = "api/product1.0")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class AppController {
    @Autowired
    private AppServices appServices;

    @RequestMapping(method = RequestMethod.GET, value = "getproducthome")
    public List<Product> getProductHome() {
        return appServices.getProductHome();
    }

    @RequestMapping(method = RequestMethod.GET, value = "getproductid")
    public ProductDetail getProductById(@RequestParam Integer id) {
        return appServices.getProductId(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getproductbagbyaccountid")
    public List<ShowAccountBag> getBag(@RequestParam Integer accountId) {
        return appServices.getProductBagByAccountID(accountId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getbilldetailbyaccountid")
    public List<OrderObject> getBillDetail(@RequestParam Integer accountId) {
        return appServices.getOrderObjectByAccountId(accountId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "checklogin")
    public AccountCustom checkLogin(@RequestParam String userName, String userPass) {
        return appServices.checkLogin(userName, userPass);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getcontacts")
    public AccountCustom getAccountContacts(@RequestParam int accountId) {
        return appServices.getAccountContacts(accountId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "addproduct2bag")
    public AccountBag addProduct2Bag(@RequestParam int accountId, int productId, int quantity) {
        return appServices.addProduct2Bag(accountId, productId, quantity);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "deleteaccountbag")
    public AccountBag deleteAccountBag(@RequestParam int accountBagId) {
        return appServices.deleteAccountBag(accountBagId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "getcalculbag")
    public CreateOrder createBillFromBag(@RequestBody Integer[] listIdAccountBag) {
        return appServices.createOrder(listIdAccountBag);
    }

    @RequestMapping(method = RequestMethod.POST, value = "createaccount")
    public CreateAccountData createAccount(@RequestBody String accountData) {
        CreateAccountData account = GsonMix.gsonLocalDate().fromJson(accountData, CreateAccountData.class);
        return appServices.createAccountAndAccountShipContact(account);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "updateaccountbagbyid")
    public AccountBag updateAccountBagById(@RequestBody Integer[] accountBagData) {
        return appServices.updateAccountBag(accountBagData);
    }

    @RequestMapping(method = RequestMethod.POST, value = "addnewaccountshipcontact")
    public AccountShipContact addNewAccountShipContact(@RequestBody String accountShipContactData) {
        AccountShipContact accountShipContact = GsonMix.gsonLocalDate().fromJson(accountShipContactData, AccountShipContact.class);
        return appServices.addNewAccountShipContact(accountShipContact);
    }


    @RequestMapping(method = RequestMethod.POST, value = "createbill")
    public OrderData createBill(@RequestBody String orderData) {
        OrderData createOrderData = GsonMix.gsonLocalDate().fromJson(orderData, OrderData.class);
        return appServices.createBill(createOrderData);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "cancelbill")
    public Bill cancelBill(@RequestParam Integer billId, Integer type) {
        return appServices.cancelBill(billId, type);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "deleteshipcontact")
    public AccountShipContact removeAccountShipContact(@RequestParam Integer idAccountShipContact) {
        return appServices.removeAccountShipContact(idAccountShipContact);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "remakeaccount")
    public RemakeAccountRequest remakeAccount(@RequestBody String remakeData) {
        RemakeAccountRequest data = GsonMix.gsonLocalDate().fromJson(remakeData, RemakeAccountRequest.class);
        return appServices.remakeAcountInfo(data);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "remakepassword")
    public RePassRespon rePassword(@RequestBody String remakeData) {
        RePass data = GsonMix.gsonLocalDate().fromJson(remakeData, RePass.class);
        return appServices.rePass(data);
    }

    @RequestMapping(method = RequestMethod.GET, value = "nextpage")
    public List<Product> nextPage(@RequestParam int page) {
        return appServices.nextPage(page);
    }

    @RequestMapping(method = RequestMethod.GET, value = "dress")
    public List<Product> dressCategory() {
        return appServices.dressCategory();
    }

    @RequestMapping(method = RequestMethod.GET, value = "pan")
    public List<Product> panCategory() {
        return appServices.panCategory();
    }

    @RequestMapping(method = RequestMethod.GET, value = "shirt")
    public List<Product> shirtCategory() {
        return appServices.shirtCategory();
    }

    @RequestMapping(method = RequestMethod.GET, value = "search")
    public List<Product> searchProduct(@RequestParam String search) {
        return appServices.searchProduct(search);
    }
}

