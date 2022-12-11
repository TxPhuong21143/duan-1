package shop.clothesshop.entities.adminrequest;

public class HoldBillRequestPayBill {
    private Integer idBill;
    private Integer idEmployee;
    private Integer idVoucher;
    private Integer idBuyMethod;
    private String customerName;
    private String customerSdt;
    private String customAddress;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerSdt() {
        return customerSdt;
    }

    public void setCustomerSdt(String customerSdt) {
        this.customerSdt = customerSdt;
    }

    public String getCustomAddress() {
        return customAddress;
    }

    public void setCustomAddress(String customAddress) {
        this.customAddress = customAddress;
    }

    public Integer getIdBill() {
        return idBill;
    }

    public void setIdBill(Integer idBill) {
        this.idBill = idBill;
    }

    public Integer getIdEmployee() {
        return idEmployee;
    }

    public void setIdEmployee(Integer idEmployee) {
        this.idEmployee = idEmployee;
    }

    public Integer getIdVoucher() {
        return idVoucher;
    }

    public void setIdVoucher(Integer idVoucher) {
        this.idVoucher = idVoucher;
    }

    public Integer getIdBuyMethod() {
        return idBuyMethod;
    }

    public void setIdBuyMethod(Integer idBuyMethod) {
        this.idBuyMethod = idBuyMethod;
    }
}
