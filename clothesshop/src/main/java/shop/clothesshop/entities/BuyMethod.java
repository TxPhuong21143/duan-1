package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Table(name="buymethod")
@Entity
public class BuyMethod {
    @Id
    @Column(name="buymethodid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer buyMethodId;
    @Column(name="buymethodcode")
    private String buyMethodCode;
    @Column(name="buymethodname")
    private String buyMethodName;


    public Integer getBuyMethodId() {
        return buyMethodId;
    }

    public void setBuyMethodId(Integer buyMethodId) {
        this.buyMethodId = buyMethodId;
    }

    public String getBuyMethodCode() {
        return buyMethodCode;
    }

    public void setBuyMethodCode(String buyMethodCode) {
        this.buyMethodCode = buyMethodCode;
    }

    public String getBuyMethodName() {
        return buyMethodName;
    }

    public void setBuyMethodName(String buyMethodName) {
        this.buyMethodName = buyMethodName;
    }

}
