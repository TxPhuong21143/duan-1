package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "salesstatus")
public class SalesStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salesstatusid")
    private Integer salesStatusId;
    @Column(name = "salesstatuscode")
    private String salesStatusCode;
    @Column(name = "salesstatusdetail")
    private String salesStatusDetail;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "salesStatus")
    @JsonManagedReference
    private List<Sales> saless;

    public Integer getSalesStatusId() {
        return salesStatusId;
    }

    public void setSalesStatusId(Integer salesStatusId) {
        this.salesStatusId = salesStatusId;
    }

    public String getSalesStatusCode() {
        return salesStatusCode;
    }

    public void setSalesStatusCode(String salesStatusCode) {
        this.salesStatusCode = salesStatusCode;
    }

    public String getSalesStatusDetail() {
        return salesStatusDetail;
    }

    public void setSalesStatusDetail(String salesStatusDetail) {
        this.salesStatusDetail = salesStatusDetail;
    }

    public List<Sales> getSaless() {
        return saless;
    }

    public void setSaless(List<Sales> saless) {
        this.saless = saless;
    }
}

