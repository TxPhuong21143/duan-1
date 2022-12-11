package shop.clothesshop.entities.adminrespon;

import shop.clothesshop.entities.Bill;
import shop.clothesshop.entities.Sales;

import java.util.List;

public class HoldBill {
    private List<BillDetailAndProduct> billDetailAndProductList;
    private Bill bill;
    private List<Sales> sales;

    public List<Sales> getSales() {
        return sales;
    }

    public void setSales(List<Sales> sales) {
        this.sales = sales;
    }

    public List<BillDetailAndProduct> getBillDetailAndProductList() {
        return billDetailAndProductList;
    }

    public void setBillDetailAndProductList(List<BillDetailAndProduct> billDetailAndProductList) {
        this.billDetailAndProductList = billDetailAndProductList;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
