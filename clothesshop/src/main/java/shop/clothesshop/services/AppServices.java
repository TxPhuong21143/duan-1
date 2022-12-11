package shop.clothesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.clothesshop.entities.*;
import shop.clothesshop.entities.requestobject.CreateAccountData;
import shop.clothesshop.entities.requestobject.OrderData;
import shop.clothesshop.entities.requestobject.RePass;
import shop.clothesshop.entities.requestobject.RemakeAccountRequest;
import shop.clothesshop.entities.responobject.*;
import shop.clothesshop.repository.context.DBContext;
import shop.clothesshop.services.iservices.IAppServices;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppServices implements IAppServices {

    @Autowired
    private DBContext dbContext;

    @Override
    public List<Product> getProductHome() {
        List<Product> fullList = dbContext.productRepo.findAll();
        return fullList.subList(0,9);
    }

    @Override
    public ProductDetail getProductId(int productId) {
        ProductDetail productDetail = new ProductDetail();
        Product p = dbContext.productRepo.findById(productId).get();
        productDetail.setProduct(p);
        productDetail.setBrand(p.getBrand());
        productDetail.setProducer(p.getProducer());
        productDetail.setSize(p.getSize());
        productDetail.setColor(p.getColor());
        productDetail.setCategoryType(p.getCategoryType());
        return productDetail;
    }
//ORM
    @Override
    public List<ShowAccountBag> getProductBagByAccountID(int accountId) {
        List<ShowAccountBag> result = new ArrayList<>();
        List<AccountBag> listAccountBag = dbContext.accountBagRepo.findByAccountId(accountId);
        for (AccountBag ab : listAccountBag) {
            ShowAccountBag showAccountBag = new ShowAccountBag();
            showAccountBag.setAccountBag(ab);
            showAccountBag.setProduct(dbContext.productRepo.findById(ab.getProductId()).get());
            showAccountBag.setCategoryType(ab.getProduct().getCategoryType());
            result.add(showAccountBag);
        }
        return result;
    }

    @Override
    public List<OrderObject> getOrderObjectByAccountId(int accountId) {
        Optional<Accounts> account = dbContext.accountRepo.findById(accountId);
        if (account.isEmpty()) {
            return null;
        }
        if (account.get().getAccountShipContacts() == null) {
            return null;
        }
        List<AccountShipContact> listShipContact = account.get().getAccountShipContacts();
        List<OrderObject> listResult = new ArrayList<>();
        for (AccountShipContact a : listShipContact) {
            for (Bill bill : a.getBills()) {
                OrderObject oo = new OrderObject();
                oo.setAccountShipContact(a);
                oo.setBill(bill);
                oo.setBillStatus(bill.getBillStatus());
                oo.setBuyMethod(bill.getBuyMethod());
                for (BillSales bs : bill.getBillSalesList()) {
                    if (bs.getSales().getSaleType().getSaleTypeId() == 1) {
                        oo.setFreeShip(bs.getSales().getSalesInt() + bs.getSales().getSalesPercent());
                    }
                    if (bs.getSales().getSaleType().getSaleTypeId() == 2) {
                        oo.setVoucherSIXDO(bs.getSales().getSalesInt() + bs.getSales().getSalesPercent());
                    }
                }
                oo.setShipMethod(bill.getShipMethod());
                List<ProductBillDetail> pd = new ArrayList<>();
                for (BillDetail billDetail : bill.getBillDetails()) {
                    ProductBillDetail pdb = new ProductBillDetail();
                    pdb.setProduct(billDetail.getProduct());
                    pdb.setBillDetail(billDetail);
                    pd.add(pdb);
                }
                oo.setProductBillDetails(pd);
                listResult.add(oo);
            }
        }
        return listResult;
    }

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
    public AccountBag addProduct2Bag(int accountId, int productId, int quantity) {
        AccountBag accountBagCheck = dbContext.accountBagRepo.findByAccountIdAndProductId(accountId,productId);
        if(accountBagCheck != null){
            accountBagCheck.setQuantity(accountBagCheck.getQuantity()+quantity);
            dbContext.accountBagRepo.save(accountBagCheck);
            return accountBagCheck;
        }

        ///// sua doi
        AccountBag accountBag = new AccountBag();
        accountBag.setAccount(dbContext.accountRepo.findById(accountId).get());
        accountBag.setProduct(dbContext.productRepo.findById(productId).get());
        accountBag.setQuantity(quantity);
        dbContext.accountBagRepo.save(accountBag);
        return accountBag;
    }

    @Override
    public AccountBag deleteAccountBag(int accountBagId) {
        Optional<AccountBag> accountBag = dbContext.accountBagRepo.findById(accountBagId);
        if (accountBag.isEmpty()) {
            return null;
        }
        dbContext.accountBagRepo.delete(accountBag.get());
        return accountBag.get();
    }

    @Override
    public CreateOrder createOrder(Integer[] listIdAccountBag) {
        CreateOrder co = new CreateOrder();
        List<OrderItem> orderItems = new ArrayList<>();
        List<Sales> salesOfBill = dbContext.salesRepo.getAllOfBillWithoutOff();
        List<ShipMethod> shipMethods = dbContext.shipMethodRepo.findAll();
        List<BuyMethod> buyMethods = dbContext.buyMethodRepo.findAll();
        List<AccountShipContact> accountShipContacts = dbContext.accountBagRepo.findById(listIdAccountBag[0]).get().getAccount().getAccountShipContacts();
        for (Integer i : listIdAccountBag) {
            OrderItem oi = new OrderItem();
            AccountBag ab = dbContext.accountBagRepo.findById(i).get();
            oi.setAccountBagId(i);
            oi.setProduct(ab.getProduct());
            oi.setQuantity(ab.getQuantity());
            oi.setCategoryType(ab.getProduct().getCategoryType());
            orderItems.add(oi);
        }
        co.setAccountShipContacts(accountShipContacts);
        co.setOrderItems(orderItems);
        co.setSalesOfBill(salesOfBill);
        co.setBuyMethods(buyMethods);
        co.setShipMethods(shipMethods);
        return co;
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
        dbContext.accountRepo.save(account);
        account.setAccountCode("TK"+account.getAccountId());
        dbContext.accountRepo.save(account);
        accountData.setUserPass("");
        accountData.setId(account.getAccountId());
        return accountData;
    }

    @Override
    public AccountBag updateAccountBag(Integer[] accountBagData) {
        AccountBag accountBag = dbContext.accountBagRepo.findById(accountBagData[0]).get();
        accountBag.setQuantity(accountBagData[1]);
        dbContext.accountBagRepo.save(accountBag);
        return accountBag;
    }

    @Override
    public AccountShipContact addNewAccountShipContact(AccountShipContact accountShipContact) {
        accountShipContact.setAccountShipContactStatusId(1);
        dbContext.accountShipContactRepo.save(accountShipContact);
        return accountShipContact;
    }

    @Override
    public OrderData createBill(OrderData orderData) {
        Bill bill = new Bill();
        bill.setBillStatusId(1);
        bill.setShipMethodId(orderData.getShipOptId());
        bill.setBuyMethodId(orderData.getBuyOptId());
        bill.setCreateDate(LocalDate.now());
        bill.setBuyerNotification(orderData.getBuyerNotification());
        bill.setAccountShipContactId(orderData.getAccountShipContactId());
        bill.setShipPrice(orderData.getShipPrice());
        dbContext.billRepo.save(bill);
        bill.setBillCode("HD" + bill.getBillId());
        double totalBill = 0;
        for (Integer accountBagId : orderData.getAccountBags()) {
            AccountBag ab = dbContext.accountBagRepo.findById(accountBagId).get();
            BillDetail bd = new BillDetail();
            bd.setBillId(bill.getBillId());
            bd.setProductId(ab.getProductId());
            bd.setQuantity(ab.getQuantity());
            bd.setPrice((double) ab.getProduct().getShellPrice());
            totalBill += ab.getProduct().getShellPrice() * ab.getQuantity();
            dbContext.billDetailRepo.save(bd);
            dbContext.accountBagRepo.delete(ab);
        }
        if (orderData.getShipVoucher() != null) {
            BillSales bs = new BillSales();
            bs.setBillId(bill.getBillId());
            bs.setSalesId(orderData.getShipVoucher());
            dbContext.billSalesRepo.save(bs);
        }
        if (orderData.getVoucherVoucher() != null) {
            BillSales bs = new BillSales();
            bs.setBillId(bill.getBillId());
            bs.setSalesId(orderData.getVoucherVoucher());
            dbContext.billSalesRepo.save(bs);
        }
        bill.setTotalBill(totalBill);
        dbContext.billRepo.save(bill);
        return orderData;
    }

    @Override
    public Bill cancelBill(Integer billId, Integer type) {
        Optional<Bill> bill = dbContext.billRepo.findById(billId);
        if (bill.isEmpty()) {
            return null;
        }
        Bill getBill = bill.get();
        LocalDate today = LocalDate.now();
        switch (type) {
            case 1:
                getBill.setShipToBuyerDate(today.plusDays(5));
                getBill.setBillStatusId(2);
                for (BillDetail bd : getBill.getBillDetails()) {
                    Product p = bd.getProduct();
                    p.setQuantity(p.getQuantity() - bd.getQuantity());
                    dbContext.productRepo.save(p);
                }
                dbContext.billRepo.save(getBill);
                return getBill;
            // case đã giao sẽ cần thông tin phía giao hàng
            //case 2 là hủy đơn chờ
            case 2:
                getBill.setCloseDateTime(today);
                getBill.setBillStatusId(4);
                dbContext.billRepo.save(getBill);
                for (BillDetail bd : getBill.getBillDetails()) {
                    Product p = bd.getProduct();
                    p.setQuantity(p.getQuantity() + bd.getQuantity());
                    dbContext.productRepo.save(p);
                }
                return getBill;
            case 3:
                getBill.setCloseDateTime(today);
                getBill.setBillStatusId(5);
                dbContext.billRepo.save(getBill);
                for (BillDetail bd : getBill.getBillDetails()) {
                    Product p = bd.getProduct();
                    p.setQuantity(p.getQuantity() + bd.getQuantity());
                    dbContext.productRepo.save(p);
                }
                return getBill;
            default:
                return null;
        }
    }

    @Override
    public AccountShipContact removeAccountShipContact(Integer idAccountShipContact) {
        Optional<AccountShipContact> accountShipContact = dbContext.accountShipContactRepo.findById(idAccountShipContact);
        if (accountShipContact.isEmpty()) {
            return null;
        }
        accountShipContact.get().setAccountShipContactStatusId(2);
        dbContext.accountShipContactRepo.save(accountShipContact.get());
        return accountShipContact.get();
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
        dbContext.accountRepo.save(account);
        rpr.setStatus(3);
        rpr.setDetail("Đổi mật khẩu thành công!");
        return rpr;
    }

    @Override
    public List<Product> nextPage(int page) {
        List<Product> getAll = dbContext.productRepo.findAll();
        if(page*9+9>=getAll.size()){
            return getAll.subList(getAll.size()-10,getAll.size()-1);
        }
        return getAll.subList(page*9-9,page*9);
    }

    @Override
    public List<Product> dressCategory() {
        return dbContext.productRepo.dressCategory();
    }

    @Override
    public List<Product> panCategory() {
        return dbContext.productRepo.panCategory();
    }

    @Override
    public List<Product> shirtCategory() {
        return dbContext.productRepo.shirtCategory();
    }

    @Override
    public List<Product> searchProduct(String searchInput) {
        return dbContext.productRepo.searchProduct(searchInput);
    }
}
