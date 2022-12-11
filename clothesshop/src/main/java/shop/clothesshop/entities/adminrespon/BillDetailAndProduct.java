package shop.clothesshop.entities.adminrespon;

import shop.clothesshop.entities.BillDetail;
import shop.clothesshop.entities.Product;

import java.time.LocalDate;

public class BillDetailAndProduct {
    private BillDetail billDetail;
    private Product product;
    private LocalDate createDate;

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public BillDetail getBillDetail() {
        return billDetail;
    }

    public void setBillDetail(BillDetail billDetail) {
        this.billDetail = billDetail;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
