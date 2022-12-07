package shop.clothesshop.entities.adminrespon;

public class MonthAnalysis {
    private Integer shippedBillTotal;
    private Integer soldTotal;
    private Double profitBefore;
    private Integer backBillTotal;
    private Double shipLossTotal;
    private Double resultProfit;

    public Integer getShippedBillTotal() {
        return shippedBillTotal;
    }

    public void setShippedBillTotal(Integer shippedBillTotal) {
        this.shippedBillTotal = shippedBillTotal;
    }

    public Integer getSoldTotal() {
        return soldTotal;
    }

    public void setSoldTotal(Integer soldTotal) {
        this.soldTotal = soldTotal;
    }

    public Double getProfitBefore() {
        return profitBefore;
    }

    public void setProfitBefore(Double profitBefore) {
        this.profitBefore = profitBefore;
    }

    public Integer getBackBillTotal() {
        return backBillTotal;
    }

    public void setBackBillTotal(Integer backBillTotal) {
        this.backBillTotal = backBillTotal;
    }

    public Double getShipLossTotal() {
        return shipLossTotal;
    }

    public void setShipLossTotal(Double shipLossTotal) {
        this.shipLossTotal = shipLossTotal;
    }

    public Double getResultProfit() {
        return resultProfit;
    }

    public void setResultProfit(Double resultProfit) {
        this.resultProfit = resultProfit;
    }
}
