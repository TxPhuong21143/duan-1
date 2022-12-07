package shop.clothesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.AccountStatus;
import shop.clothesshop.entities.Accounts;
import shop.clothesshop.entities.Role;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.AccountCustom;
import shop.clothesshop.entities.responobject.RePassRespon;
import shop.clothesshop.repository.context.DBContext;
import shop.clothesshop.services.iservices.IAppServices;

import java.time.LocalDate;
import java.util.Optional;

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
    public AccountCustom getAccountContacts(int accountBagId) {
        Optional<Accounts> accountOp = dbContext.accountRepo.findById(accountBagId);
        if (accountOp.isEmpty()) {
            return null;
        }
        Accounts account = accountOp.get();
        AccountCustom result = new AccountCustom();
        result.setId(account.getAccountId());
        result.setAddress(account.getAccountDetailAddress());
        result.setName(account.getName());
        result.setSdt(account.getSdt());
        result.setBorn(account.getAccountBorn());
        result.setShipContacts(dbContext.accountShipContactRepo.getAccountShipContactOn(account.getAccountId()));
        return result;
    }


    @Override
    public CreateAccountData createAccountAndAccountShipContact(CreateAccountData accountData) {
        Accounts account = new Accounts();
        if (!dbContext.accountRepo.checkUserName(accountData.getUserName()).isEmpty()) {
            return new CreateAccountData(1);
        }
        account.setSdt(accountData.getSdt());
        account.setAccountDetailAddress(accountData.getAddress());
        account.setName(accountData.getName());
        account.setAccountPassword(accountData.getUserPass());
        account.setAccountUserName(accountData.getUserName());
        account.setCreateDate(LocalDate.now());
        AccountStatus statusOnline = dbContext.accountStatusRepo.findById(1).get();
        account.setAccountStatus(statusOnline);
        Role role = dbContext.roleRepo.findById(3).get();
        account.setRole(role);
        dbContext.accountRepo.save(account);
        accountData.setUserPass("");
        accountData.setId(account.getAccountId());
        return accountData;
    }

    @Override
    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact) {
        accountShipContact.setAccountShipContactStatusId(1);
        dbContext.accountShipContactRepo.save(accountShipContact);
        return accountShipContact;
    }

    @Override
    public RemakeAccountRequest remakeAcountInfo(RemakeAccountRequest accountRemake) {
        Optional<Accounts> accountsOptional = dbContext.accountRepo.findById(accountRemake.getAccountId());
        if (accountsOptional.isEmpty()) {
            return null;
        }
        Accounts account = accountsOptional.get();
        account.setAccountDetailAddress(accountRemake.getAddress());
        account.setName(accountRemake.getName());
        account.setAccountBorn(accountRemake.getBorn());
        account.setUpdateDate(LocalDate.now());
        account.setSdt(accountRemake.getSdt());
        dbContext.accountRepo.save(account);
        return accountRemake;
    }


    @Override
    public RePassRespon rePass(RePass rePassData) {
        RePassRespon rpr = new RePassRespon();
        Optional<Accounts> accountsOptional = dbContext.accountRepo.findById(rePassData.getAccountId());
        if (accountsOptional.isEmpty()) {
            rpr.setStatus(1);
            rpr.setDetail("Tài khoản không tồn tại!");
            return rpr;
        }
        Accounts account = accountsOptional.get();
        if (!account.getAccountPassword().equals(rePassData.getOldPass())) {
            rpr.setStatus(2);
            rpr.setDetail("Mật khẩu hiện tại không chính xác!");
            return rpr;
        }
        account.setAccountPassword(rePassData.getNewPass());
        rpr.setStatus(3);
        rpr.setDetail("Đổi mật khẩu thành công!");
        return rpr;
    }

}
