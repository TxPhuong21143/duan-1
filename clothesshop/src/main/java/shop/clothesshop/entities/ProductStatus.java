package shop.clothesshop.entities;

import javax.persistence.*;

@Entity
@Table(name = "productstatus")
public class ProductStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productstatusid")
    private Integer productStatusId;
    @Column(name = "productstatuscode")
    private String productStatusCode;
    @Column(name = "productstatusdetail")
    private String productStatusDetail;

    public Integer getProductStatusId() {
        return productStatusId;
    }

    public void setProductStatusId(Integer productStatusId) {
        this.productStatusId = productStatusId;
    }

    public String getProductStatusCode() {
        return productStatusCode;
    }

    public void setProductStatusCode(String productStatusCode) {
        this.productStatusCode = productStatusCode;
    }

    public String getProductStatusDetail() {
        return productStatusDetail;
    }

    public void setProductStatusDetail(String productStatusDetail) {
        this.productStatusDetail = productStatusDetail;
    }
}
