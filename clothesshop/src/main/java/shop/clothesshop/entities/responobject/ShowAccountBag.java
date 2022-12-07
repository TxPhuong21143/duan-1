package shop.clothesshop.entities.responobject;

import shop.clothesshop.entities.*;

public class ShowAccountBag {
    private AccountBag accountBag;
    private Product product;
    private CategoryType categoryType;

    public AccountBag getAccountBag() {
        return accountBag;
    }

    public void setAccountBag(AccountBag accountBag) {
        this.accountBag = accountBag;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }
}
