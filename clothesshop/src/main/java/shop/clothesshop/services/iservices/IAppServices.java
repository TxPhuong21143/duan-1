package shop.clothesshop.services.iservices;

import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.AccountCustom;
import shop.clothesshop.entities.responobject.RePassRespon;

public interface IAppServices {

    public AccountCustom checkLogin(String useName, String userPass);

    public AccountCustom getAccountContacts(int accountId);


    public CreateAccountData createAccountAndAccountShipContact(CreateAccountData accountData);

    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact);

    public RemakeAccountRequest remakeAcountInfo(RemakeAccountRequest accountRemake);

    public RePassRespon rePass(RePass rePassData);
}
