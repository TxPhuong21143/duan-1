package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Table(name = "sales")
@Entity
public class Sales {
    @Id
    @Column(name = "salesid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer salesId;
    @Column(name = "salescode")
    private String salesCode;
    @Column(name = "salesname")
    private String salesName;
    @Column(name = "salespercent")
    private Integer salesPercent;
    @Column(name = "salesint")
    private Integer salesInt;
    @Column(name = "opendate")
    private LocalDate openDate;
    @Column(name = "enddate")
    private LocalDate endDate;
    @Column(name = "salesstatusid")
    private Integer salessStatusId;
    @Column(name="saletypeid")
    private Integer saleTypeId;
    @ManyToOne()
    @JoinColumn(name="saletypeid", insertable = false, updatable = false)
    @JsonBackReference
    private SaleType saleType;
    @ManyToOne
    @JoinColumn(name = "salesstatusid", insertable = false, updatable = false)
    @JsonBackReference
    private SalesStatus salesStatus;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sales")
    @JsonManagedReference
    private List<BillSales> billSalesList;

    public Integer getSaleTypeId() {
        return saleTypeId;
    }

    public void setSaleTypeId(Integer saleTypeId) {
        this.saleTypeId = saleTypeId;
    }

    public SaleType getSaleType() {
        return saleType;
    }

    public void setSaleType(SaleType saleType) {
        this.saleType = saleType;
    }

    public Integer getSalesId() {
        return salesId;
    }

    public void setSalesId(Integer salesId) {
        this.salesId = salesId;
    }

    public String getSalesCode() {
        return salesCode;
    }

    public void setSalesCode(String salesCode) {
        this.salesCode = salesCode;
    }

    public String getSalesName() {
        return salesName;
    }

    public void setSalesName(String salesName) {
        this.salesName = salesName;
    }

    public Integer getSalesPercent() {
        return salesPercent;
    }

    public void setSalesPercent(Integer salesPercent) {
        this.salesPercent = salesPercent;
    }

    public Integer getSalesInt() {
        return salesInt;
    }

    public void setSalesInt(Integer salesInt) {
        this.salesInt = salesInt;
    }
    public LocalDate getOpenDate() {
        return openDate;
    }

    public void setOpenDate(LocalDate openDate) {
        this.openDate = openDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getSalessStatusId() {
        return salessStatusId;
    }

    public void setSalessStatusId(Integer salessStatusId) {
        this.salessStatusId = salessStatusId;
    }

    public SalesStatus getSalesStatus() {
        return salesStatus;
    }

    public void setSalesStatus(SalesStatus salesStatus) {
        this.salesStatus = salesStatus;
    }

    public List<BillSales> getBillSalesList() {
        return billSalesList;
    }

    public void setBillSalesList(List<BillSales> billSalesList) {
        this.billSalesList = billSalesList;
    }
}
