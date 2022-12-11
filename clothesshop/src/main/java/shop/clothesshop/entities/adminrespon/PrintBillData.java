package shop.clothesshop.entities.adminrespon;

import java.time.LocalDate;
import java.util.List;

public class PrintBillData {
    private List<BillDetailPrint> billDetailPrints;
    private Double total;
    private Double totalResult;
    private Double shipPrice;
    private Double freeShip = 0d;
    private Double voucher = 0d;
    private String billCode;
    private String reveceiName;
    private String reveceiSdt;
    private String reveceiAddress;
    private String employeeName;
    private LocalDate closeDate;

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public String getReveceiName() {
        return reveceiName;
    }

    public void setReveceiName(String reveceiName) {
        this.reveceiName = reveceiName;
    }

    public String getReveceiSdt() {
        return reveceiSdt;
    }

    public void setReveceiSdt(String reveceiSdt) {
        this.reveceiSdt = reveceiSdt;
    }

    public String getReveceiAddress() {
        return reveceiAddress;
    }

    public void setReveceiAddress(String reveceiAddress) {
        this.reveceiAddress = reveceiAddress;
    }

    public List<BillDetailPrint> getBillDetailPrints() {
        return billDetailPrints;
    }

    public void setBillDetailPrints(List<BillDetailPrint> billDetailPrints) {
        this.billDetailPrints = billDetailPrints;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(Double totalResult) {
        this.totalResult = totalResult;
    }

    public Double getShipPrice() {
        return shipPrice;
    }

    public void setShipPrice(Double shipPrice) {
        this.shipPrice = shipPrice;
    }

    public Double getFreeShip() {
        return freeShip;
    }

    public void setFreeShip(Double freeShip) {
        this.freeShip = freeShip;
    }

    public Double getVoucher() {
        return voucher;
    }

    public void setVoucher(Double voucher) {
        this.voucher = voucher;
    }
}
