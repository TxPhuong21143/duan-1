package shop.clothesshop.entities.responobject;

import shop.clothesshop.entities.AccountShipContact;

import java.time.LocalDate;
import java.util.List;

public class AccountCustom {
    private Integer Id;
    private String name;
    private String address;
    private LocalDate born;
    private List<AccountShipContact> shipContacts;
    private Integer roleID;
    private String sdt;

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public Integer getRoleID() {
        return roleID;
    }

    public void setRoleID(Integer roleID) {
        this.roleID = roleID;
    }

    public LocalDate getBorn() {
        return born;
    }

    public void setBorn(LocalDate born) {
        this.born = born;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<AccountShipContact> getShipContacts() {
        return shipContacts;
    }

    public void setShipContacts(List<AccountShipContact> shipContacts) {
        this.shipContacts = shipContacts;
    }
}
