package shop.clothesshop.entities.responobject;

import shop.clothesshop.entities.CategoryType;
import shop.clothesshop.entities.Product;

public class OrderItem {
    private Integer accountBagId;
    private Integer quantity;
    private Product product;
    private CategoryType categoryType;

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }

    public Integer getAccountBagId() {
        return accountBagId;
    }

    public void setAccountBagId(Integer accountBagId) {
        this.accountBagId = accountBagId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
