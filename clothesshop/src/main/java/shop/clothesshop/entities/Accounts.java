package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Table(name = "accounts")
@Entity
public class Accounts {
    @Id
    @Column(name = "accountid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;
    @Column(name = "accountusername")
    private String accountUserName;
    @Column(name = "accountcode")
    private String accountCode;
    @Column(name = "accountpassword")
    private String accountPassword;
    @Column(name = "accountstatusid", insertable = false, updatable = false)
    private Integer accountStatusId;
    @Column(name = "accountborn")
    private LocalDate accountBorn;
    @Column(name = "accountdetailaddress")
    private String accountDetailAddress;
    @Column(name = "accountcreatedate")
    private LocalDate accountCreateDate;
    @Column(name = "roleid", insertable = false, updatable = false)
    private Integer roleId;
    @ManyToOne
    @JoinColumn(name = "roleid")
    @JsonBackReference
    private Role role;
    @Column(name = "createdate")
    private LocalDate createDate;
    @Column(name = "updatedate")
    private LocalDate updateDate;
    @Column(name = "token")
    private String token;
    @Column(name = "name")
    private String name;
    @Column(name = "sdt")
    private String sdt;

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getRoleId() {

        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @ManyToOne
    @JoinColumn(name = "accountstatusid")
    @JsonBackReference
    private AccountStatus accountStatus;

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<AccountShipContact> accountShipContacts;

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<AccountBag> accountBags;

    @OneToMany(mappedBy = "account")
    @JsonManagedReference
    private List<VoteStar> voteStars;

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getAccountUserName() {
        return accountUserName;
    }

    public void setAccountUserName(String accountUserName) {
        this.accountUserName = accountUserName;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }

    public Integer getAccountStatusId() {
        return accountStatusId;
    }

    public void setAccountStatusId(Integer accountStatusId) {
        this.accountStatusId = accountStatusId;
    }


    public LocalDate getAccountBorn() {
        return accountBorn;
    }

    public void setAccountBorn(LocalDate accountBorn) {
        this.accountBorn = accountBorn;
    }


    public String getAccountDetailAddress() {
        return accountDetailAddress;
    }

    public void setAccountDetailAddress(String accountDetailAddress) {
        this.accountDetailAddress = accountDetailAddress;
    }


    public LocalDate getAccountCreateDate() {
        return accountCreateDate;
    }

    public void setAccountCreateDate(LocalDate accountCreateDate) {
        this.accountCreateDate = accountCreateDate;
    }


    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public List<AccountShipContact> getAccountShipContacts() {
        return accountShipContacts;
    }

    public void setAccountShipContacts(List<AccountShipContact> accountShipContacts) {
        this.accountShipContacts = accountShipContacts;
    }

    public List<AccountBag> getAccountBags() {
        return accountBags;
    }

    public void setAccountBags(List<AccountBag> accountBags) {
        this.accountBags = accountBags;
    }

    public List<VoteStar> getVoteStars() {
        return voteStars;
    }

    public void setVoteStars(List<VoteStar> voteStars) {
        this.voteStars = voteStars;
    }
}
