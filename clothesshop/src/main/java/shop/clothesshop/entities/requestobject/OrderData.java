package shop.clothesshop.entities.requestobject;

import shop.clothesshop.entities.AccountBag;

import java.util.List;

public class OrderData {
    private Integer accountShipContactId;
    private List<Integer> accountBags;
    private Integer shipOptId;
    private Integer buyOptId;
    private Integer shipVoucher;
    private Integer voucherVoucher;
    private String buyerNotification;
    private Double shipPrice;

    public Double getShipPrice() {
        return shipPrice;
    }

    public void setShipPrice(Double shipPrice) {
        this.shipPrice = shipPrice;
    }

    public String getBuyerNotification() {
        return buyerNotification;
    }

    public void setBuyerNotification(String buyerNotification) {
        this.buyerNotification = buyerNotification;
    }

    public Integer getAccountShipContactId() {
        return accountShipContactId;
    }

    public void setAccountShipContactId(Integer accountShipContactId) {
        this.accountShipContactId = accountShipContactId;
    }

    public List<Integer> getAccountBags() {
        return accountBags;
    }

    public void setAccountBags(List<Integer> accountBags) {
        this.accountBags = accountBags;
    }

    public Integer getShipOptId() {
        return shipOptId;
    }

    public void setShipOptId(Integer shipOptId) {
        this.shipOptId = shipOptId;
    }

    public Integer getBuyOptId() {
        return buyOptId;
    }

    public void setBuyOptId(Integer buyOptId) {
        this.buyOptId = buyOptId;
    }

    public Integer getShipVoucher() {
        return shipVoucher;
    }

    public void setShipVoucher(Integer shipVoucher) {
        this.shipVoucher = shipVoucher;
    }

    public Integer getVoucherVoucher() {
        return voucherVoucher;
    }

    public void setVoucherVoucher(Integer voucherVoucher) {
        this.voucherVoucher = voucherVoucher;
    }
}
