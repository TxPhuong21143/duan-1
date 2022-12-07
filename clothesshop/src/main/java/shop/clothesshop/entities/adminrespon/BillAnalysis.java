package shop.clothesshop.entities.adminrespon;

import shop.clothesshop.entities.Bill;

import java.time.LocalDate;
import java.util.List;

public class BillAnalysis {
    private Integer billId;
    private String billCode;
    private Integer idCustomer;
    private String customerName;
    private String reveceiName;
    private String reveceiSdt;
    private String voucherCode;
    private String voucherShipCode;
    private LocalDate createBill;
    private String shipMethodName;
    private Double shipPrice;
    private String notification;
    private LocalDate closeDate;
    private LocalDate reveceiDate;
    private String billStatus;
    private String buyMethod;
    private String buyStatus;
    private String reveceiContact;
    private String shipStatus;
    private String reveceiMethod;
    private Double totalBill;
    private Integer shipVoucher;
    private Integer voucherVoucher;
    private Double totalResult;
    private Integer billStatusId;
    List<BillDetailAnalysis> billDetailAnalyses;

    public Integer getBillStatusId() {
        return billStatusId;
    }

    public void setBillStatusId(Integer billStatusId) {
        this.billStatusId = billStatusId;
    }

    public Double getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(Double totalBill) {
        this.totalBill = totalBill;
    }

    public Integer getShipVoucher() {
        return shipVoucher;
    }

    public void setShipVoucher(Integer shipVoucher) {
        this.shipVoucher = shipVoucher;
    }

    public Integer getVoucherVoucher() {
        return voucherVoucher;
    }

    public void setVoucherVoucher(Integer voucherVoucher) {
        this.voucherVoucher = voucherVoucher;
    }

    public Double getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(Double totalResult) {
        this.totalResult = totalResult;
    }

    public String getReveceiContact() {
        return reveceiContact;
    }

    public void setReveceiContact(String reveceiContact) {
        this.reveceiContact = reveceiContact;
    }

    public String getShipStatus() {
        return shipStatus;
    }

    public void setShipStatus(String shipStatus) {
        this.shipStatus = shipStatus;
    }

    public String getReveceiMethod() {
        return reveceiMethod;
    }

    public void setReveceiMethod(String reveceiMethod) {
        this.reveceiMethod = reveceiMethod;
    }

    public String getBuyMethod() {
        return buyMethod;
    }

    public void setBuyMethod(String buyMethod) {
        this.buyMethod = buyMethod;
    }

    public String getBuyStatus() {
        return buyStatus;
    }

    public void setBuyStatus(String buyStatus) {
        this.buyStatus = buyStatus;
    }

    public String getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(String billStatus) {
        this.billStatus = billStatus;
    }

    public String getNotification() {
        return notification;
    }

    public void setNotification(String notification) {
        this.notification = notification;
    }

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    public LocalDate getReveceiDate() {
        return reveceiDate;
    }

    public void setReveceiDate(LocalDate reveceiDate) {
        this.reveceiDate = reveceiDate;
    }

    public String getVoucherCode() {
        return voucherCode;
    }

    public void setVoucherCode(String voucherCode) {
        this.voucherCode = voucherCode;
    }

    public String getVoucherShipCode() {
        return voucherShipCode;
    }

    public void setVoucherShipCode(String voucherShipCode) {
        this.voucherShipCode = voucherShipCode;
    }

    public String getReveceiSdt() {
        return reveceiSdt;
    }

    public void setReveceiSdt(String reveceiSdt) {
        this.reveceiSdt = reveceiSdt;
    }

    public String getReveceiName() {
        return reveceiName;
    }

    public void setReveceiName(String reveceiName) {
        this.reveceiName = reveceiName;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public Integer getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Integer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDate getCreateBill() {
        return createBill;
    }

    public void setCreateBill(LocalDate createBill) {
        this.createBill = createBill;
    }

    public String getShipMethodName() {
        return shipMethodName;
    }

    public void setShipMethodName(String shipMethodName) {
        this.shipMethodName = shipMethodName;
    }

    public Double getShipPrice() {
        return shipPrice;
    }

    public void setShipPrice(Double shipPrice) {
        this.shipPrice = shipPrice;
    }

    public List<BillDetailAnalysis> getBillDetailAnalyses() {
        return billDetailAnalyses;
    }

    public void setBillDetailAnalyses(List<BillDetailAnalysis> billDetailAnalyses) {
        this.billDetailAnalyses = billDetailAnalyses;
    }
}
