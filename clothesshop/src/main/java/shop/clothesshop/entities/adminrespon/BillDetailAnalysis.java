package shop.clothesshop.entities.adminrespon;

public class BillDetailAnalysis {
    private Integer billDetailId;
    private byte[] productImg;
    private String productName;
    private Integer quantity;
    private Integer quantityInventory;
    private Integer shellprice;
    private Integer total;

    public Integer getBillDetailId() {
        return billDetailId;
    }

    public void setBillDetailId(Integer billDetailId) {
        this.billDetailId = billDetailId;
    }

    public byte[] getProductImg() {
        return productImg;
    }

    public void setProductImg(byte[] productImg) {
        this.productImg = productImg;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getQuantityInventory() {
        return quantityInventory;
    }

    public void setQuantityInventory(Integer quantityInventory) {
        this.quantityInventory = quantityInventory;
    }

    public Integer getShellprice() {
        return shellprice;
    }

    public void setShellprice(Integer shellprice) {
        this.shellprice = shellprice;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
