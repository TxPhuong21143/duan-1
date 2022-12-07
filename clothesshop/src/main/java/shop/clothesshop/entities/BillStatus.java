package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;


@Table(name = "billstatus")
@Entity
public class BillStatus {
    @Id
    @Column(name = "billstatusid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer billStatusId;
    @Column(name = "billstatuscode")
    private String billStatusCode;
    @Column(name = "billstatusdetail")
    private String billStatusDetail;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "billStatus")
    @JsonManagedReference
    private List<Bill> bills;

    public Integer getBillStatusId() {
        return billStatusId;
    }

    public void setBillStatusId(Integer billStatusId) {
        this.billStatusId = billStatusId;
    }

    public String getBillStatusCode() {
        return billStatusCode;
    }

    public void setBillStatusCode(String billStatusCode) {
        this.billStatusCode = billStatusCode;
    }

    public String getBillStatusDetail() {
        return billStatusDetail;
    }

    public void setBillStatusDetail(String billStatusDetail) {
        this.billStatusDetail = billStatusDetail;
    }

    public List<Bill> getBills() {
        return bills;
    }

    public void setBills(List<Bill> bills) {
        this.bills = bills;
    }
}
