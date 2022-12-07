package shop.clothesshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.responobject.AccountCustom;
import shop.clothesshop.lib.GsonMix;
import shop.clothesshop.services.AppServices;

public class AppController {
    @Autowired
    private AppServices appServices;

    @RequestMapping(method = RequestMethod.GET, value = "checklogin")
    public AccountCustom checkLogin(@RequestParam String userName, String userPass) {
        return appServices.checkLogin(userName, userPass);
    }
    @RequestMapping(method = RequestMethod.GET, value = "getcontacts")
    public AccountCustom getAccountContacts(@RequestParam int accountId) {
        return appServices.getAccountContacts(accountId);
    }
    @RequestMapping(method = RequestMethod.POST, value = "createaccount")
    public CreateAccountData createAccount(@RequestBody String accountData) {
        CreateAccountData account = GsonMix.gsonLocalDate().fromJson(accountData, CreateAccountData.class);
        return appServices.createAccountAndAccountShipContact(account);
    }
}
