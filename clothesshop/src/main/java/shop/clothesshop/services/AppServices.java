package shop.clothesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.Accounts;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.AccountCustom;
import shop.clothesshop.entities.responobject.RePassRespon;
import shop.clothesshop.repository.context.DBContext;
import shop.clothesshop.services.iservices.IAppServices;
@Service
public class AppServices implements IAppServices {
    @Autowired
private DBContext dbContext;
    @Override
    public AccountCustom checkLogin(String userName, String userPass) {
        Accounts account = dbContext.accountRepo.checkLogin(userName, userPass);
        if (account == null) {
            return null;
        }
        AccountCustom result = new AccountCustom();
        result.setRoleID(account.getRoleId());
        result.setId(account.getAccountId());
        result.setAddress(account.getAccountDetailAddress());
        result.setName(account.getName());
        result.setShipContacts(account.getAccountShipContacts());
        return result;
    }

    @Override
    public AccountCustom getAccountContacts(int accountId) {
        return null;
    }

    @Override
    public CreateAccountData createAccountAndAccountShipContact(CreateAccountData accountData) {
        return null;
    }

    @Override
    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact) {
        return null;
    }

    @Override
    public RemakeAccountRequest remakeAcountInfo(RemakeAccountRequest accountRemake) {
        return null;
    }

    @Override
    public RePassRespon rePass(RePass rePassData) {
        return null;
    }
}
