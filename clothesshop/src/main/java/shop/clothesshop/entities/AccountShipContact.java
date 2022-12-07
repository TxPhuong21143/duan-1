package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Table(name = "accountshipcontact")
@Entity
public class AccountShipContact {
    @Id
    @Column(name = "accountshipcontactid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountShipContactId;
    @Column(name = "accountid")
    private Integer accountId;
    @Column(name = "receivername")
    private String receiverName;
    @Column(name = "accountdetailaddress")
    private String accountDetailAddress;
    @Column(name = "accountphonenumber")
    private String accountPhoneNumber;
    @Column(name = "provinceid")
    private String provinceID;
    @Column(name = "districtid")
    private String districtID;
    @Column(name = "wardcode")
    private String wardCode;
    @OneToMany(mappedBy = "accountShipContact", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Bill> bills;
    @Column(name = "accountshipcontactstatusid")
    private Integer accountShipContactStatusId;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="accountshipcontactstatusid",insertable = false,updatable = false)
    private AccountShipContactStatus accountShipContactStatus;

    public Integer getAccountShipContactStatusId() {
        return accountShipContactStatusId;
    }

    public void setAccountShipContactStatusId(Integer accountShipContactStatusId) {
        this.accountShipContactStatusId = accountShipContactStatusId;
    }

    public AccountShipContactStatus getAccountShipContactStatus() {
        return accountShipContactStatus;
    }

    public void setAccountShipContactStatus(AccountShipContactStatus accountShipContactStatus) {
        this.accountShipContactStatus = accountShipContactStatus;
    }

    public String getProvinceID() {
        return provinceID;
    }

    public void setProvinceID(String provinceID) {
        this.provinceID = provinceID;
    }

    public String getDistrictID() {
        return districtID;
    }

    public void setDistrictID(String districtID) {
        this.districtID = districtID;
    }

    public String getWardCode() {
        return wardCode;
    }

    public void setWardCode(String wardCode) {
        this.wardCode = wardCode;
    }

    @ManyToOne
    @JoinColumn(name = "accountid", updatable = false, insertable = false)
    @JsonBackReference
    private Accounts account;

    public Integer getAccountShipContactId() {
        return accountShipContactId;
    }

    public void setAccountShipContactId(Integer accountShipContactId) {
        this.accountShipContactId = accountShipContactId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getAccountDetailAddress() {
        return accountDetailAddress;
    }

    public void setAccountDetailAddress(String accountDetailAddress) {
        this.accountDetailAddress = accountDetailAddress;
    }

    public String getAccountPhoneNumber() {
        return accountPhoneNumber;
    }

    public void setAccountPhoneNumber(String accountPhoneNumber) {
        this.accountPhoneNumber = accountPhoneNumber;
    }

    public List<Bill> getBills() {
        return bills;
    }

    public void setBills(List<Bill> bills) {
        this.bills = bills;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }
}
