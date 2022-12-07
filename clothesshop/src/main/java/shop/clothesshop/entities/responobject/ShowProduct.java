package shop.clothesshop.entities.responobject;

public class ShowProduct {
    private Integer id;
    private Byte[] productImg1;
    private Byte[] productImg2;
    private Integer price;
    private String productName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Byte[] getProductImg1() {
        return productImg1;
    }

    public void setProductImg1(Byte[] productImg1) {
        this.productImg1 = productImg1;
    }

    public Byte[] getProductImg2() {
        return productImg2;
    }

    public void setProductImg2(Byte[] productImg2) {
        this.productImg2 = productImg2;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
