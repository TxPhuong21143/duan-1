package shop.clothesshop.entities.adminrespon;

import shop.clothesshop.entities.Sales;

import java.util.List;

public class SalesObject {
    private List<Sales> voucherVouchers;
    private List<Sales> shipVouchers;

    public List<Sales> getVoucherVouchers() {
        return voucherVouchers;
    }

    public void setVoucherVouchers(List<Sales> voucherVouchers) {
        this.voucherVouchers = voucherVouchers;
    }

    public List<Sales> getShipVouchers() {
        return shipVouchers;
    }

    public void setShipVouchers(List<Sales> shipVouchers) {
        this.shipVouchers = shipVouchers;
    }
}
