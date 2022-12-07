package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "billsales")
public class BillSales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billsalesid")
    private Integer billSalesId;
    @Column(name = "billid")
    private Integer billId;
    @Column(name = "salesid")
    private Integer salesId;
    @ManyToOne
    @JoinColumn(name="billid", updatable = false, insertable = false)
    @JsonBackReference
    private Bill bill;
    @ManyToOne
    @JoinColumn(name="salesid", updatable = false, insertable = false)
    @JsonBackReference
    private Sales sales;

    public Integer getBillSalesId() {
        return billSalesId;
    }

    public void setBillSalesId(Integer billSalesId) {
        this.billSalesId = billSalesId;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Integer getSalesId() {
        return salesId;
    }

    public void setSalesId(Integer salesId) {
        this.salesId = salesId;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Sales getSales() {
        return sales;
    }

    public void setSales(Sales sales) {
        this.sales = sales;
    }
}
