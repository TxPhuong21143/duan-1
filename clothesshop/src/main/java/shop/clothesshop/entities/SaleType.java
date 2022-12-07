package shop.clothesshop.entities;

import javax.persistence.*;

@Entity
@Table(name="saletype")
public class SaleType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="saletypeid")
    private Integer saleTypeId;
    @Column(name="saletypecode")
    private String saleTypeCode;
    @Column(name="saletypedetail")
    private String saleTypeDetail;

    public Integer getSaleTypeId() {
        return saleTypeId;
    }

    public void setSaleTypeId(Integer saleTypeId) {
        this.saleTypeId = saleTypeId;
    }

    public String getSaleTypeCode() {
        return saleTypeCode;
    }

    public void setSaleTypeCode(String saleTypeCode) {
        this.saleTypeCode = saleTypeCode;
    }

    public String getSaleTypeDetail() {
        return saleTypeDetail;
    }

    public void setSaleTypeDetail(String saleTypeDetail) {
        this.saleTypeDetail = saleTypeDetail;
    }
}
