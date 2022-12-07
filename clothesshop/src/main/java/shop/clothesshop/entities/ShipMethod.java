package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Table(name = "shipmethod")
@Entity
public class ShipMethod {
    @Id
    @Column(name = "shipmethodid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shipMethodId;
    @Column(name = "shipmethodcode")
    private String shipMethodCode;
    @Column(name = "shipmethodname")
    private String shipMethodName;
    @Column(name = "price")
    private Integer price;

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getShipMethodId() {
        return shipMethodId;
    }

    public void setShipMethodId(Integer shipMethodId) {
        this.shipMethodId = shipMethodId;
    }

    public String getShipMethodCode() {
        return shipMethodCode;
    }

    public void setShipMethodCode(String shipMethodCode) {
        this.shipMethodCode = shipMethodCode;
    }

    public String getShipMethodName() {
        return shipMethodName;
    }

    public void setShipMethodName(String shipMethodName) {
        this.shipMethodName = shipMethodName;
    }

}
