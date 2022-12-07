package shop.clothesshop.entities.adminrespon;

import java.util.List;

public class AnalysisObject {
    private Integer productCountShelling;
    private Integer voucherCountUsing;
    private Integer productQuantityInventory;
    private Integer custumerCountActive;
    private List<TopProductSold> top5ProductSold;
    private List<TopAccountPaid> top5AccountPaid;
    private List<Integer> totalBillMonth;
    private List<MonthAnalysis> analysisProfit12Month;

    public List<TopProductSold> getTop5ProductSold() {
        return top5ProductSold;
    }

    public void setTop5ProductSold(List<TopProductSold> top5ProductSold) {
        this.top5ProductSold = top5ProductSold;
    }

    public List<TopAccountPaid> getTop5AccountPaid() {
        return top5AccountPaid;
    }

    public void setTop5AccountPaid(List<TopAccountPaid> top5AccountPaid) {
        this.top5AccountPaid = top5AccountPaid;
    }

    public Integer getProductCountShelling() {
        return productCountShelling;
    }

    public void setProductCountShelling(Integer productCountShelling) {
        this.productCountShelling = productCountShelling;
    }

    public Integer getVoucherCountUsing() {
        return voucherCountUsing;
    }

    public void setVoucherCountUsing(Integer voucherCountUsing) {
        this.voucherCountUsing = voucherCountUsing;
    }

    public Integer getProductQuantityInventory() {
        return productQuantityInventory;
    }

    public void setProductQuantityInventory(Integer productQuantityInventory) {
        this.productQuantityInventory = productQuantityInventory;
    }

    public Integer getCustumerCountActive() {
        return custumerCountActive;
    }

    public void setCustumerCountActive(Integer custumerCountActive) {
        this.custumerCountActive = custumerCountActive;
    }

    public List<Integer> getTotalBillMonth() {
        return totalBillMonth;
    }

    public void setTotalBillMonth(List<Integer> totalBillMonth) {
        this.totalBillMonth = totalBillMonth;
    }

    public List<MonthAnalysis> getAnalysisProfit12Month() {
        return analysisProfit12Month;
    }

    public void setAnalysisProfit12Month(List<MonthAnalysis> analysisProfit12Month) {
        this.analysisProfit12Month = analysisProfit12Month;
    }
}
