package shop.clothesshop.entities.responobject;

import shop.clothesshop.entities.*;

import java.util.List;
import java.util.Map;

public class OrderObject {
    private ShipMethod shipMethod;
    private BuyMethod buyMethod;
    private Bill bill;
    private BillStatus billStatus;
    private List<ProductBillDetail> productBillDetails;
    private AccountShipContact accountShipContact;
    private Integer freeShip;
    private Integer voucherSIXDO;

    public Integer getVoucherSIXDO() {
        return voucherSIXDO;
    }

    public void setVoucherSIXDO(Integer voucherSIXDO) {
        this.voucherSIXDO = voucherSIXDO;
    }

    public Integer getFreeShip() {
        return freeShip;
    }

    public void setFreeShip(Integer freeShip) {
        this.freeShip = freeShip;
    }

    public AccountShipContact getAccountShipContact() {
        return accountShipContact;
    }

    public void setAccountShipContact(AccountShipContact accountShipContact) {
        this.accountShipContact = accountShipContact;
    }

    public List<ProductBillDetail> getProductBillDetails() {
        return productBillDetails;
    }

    public void setProductBillDetails(List<ProductBillDetail> productBillDetails) {
        this.productBillDetails = productBillDetails;
    }

    public BillStatus getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(BillStatus billStatus) {
        this.billStatus = billStatus;
    }

    public ShipMethod getShipMethod() {
        return shipMethod;
    }

    public void setShipMethod(ShipMethod shipMethod) {
        this.shipMethod = shipMethod;
    }

    public BuyMethod getBuyMethod() {
        return buyMethod;
    }

    public void setBuyMethod(BuyMethod buyMethod) {
        this.buyMethod = buyMethod;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

}
