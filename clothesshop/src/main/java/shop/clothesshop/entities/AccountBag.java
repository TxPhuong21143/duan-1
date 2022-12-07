package shop.clothesshop.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Table(name = "accountbag")
@Entity
public class AccountBag {
    @Id
    @Column(name = "accountbagid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountBagId;

    @Column(name = "accountid", insertable = false, updatable = false)
    private Integer accountId;

    @Column(name = "productid", insertable = false, updatable = false)
    private Integer productId;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "accountid")
    @JsonBackReference
    private Accounts account;

    @ManyToOne
    @JoinColumn(name = "productid")
    @JsonBackReference
    private Product product;

    public Integer getAccountBagId() {
        return accountBagId;
    }

    public void setAccountBagId(Integer accountBagId) {
        this.accountBagId = accountBagId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
