package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Table(name = "accountstatus")
@Entity
public class AccountStatus {
    @Id
    @Column(name="accountstatusid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountStatusId;

    @Column(name="accountstatuscode")
    private String accountStatusCode;

    @Column(name="accountstatusdetail")
    private String accountStatusDetail;
    @OneToMany(mappedBy = "accountStatus",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Accounts> accounts;

    public Integer getAccountStatusId() {
        return accountStatusId;
    }

    public void setAccountStatusId(Integer accountStatusId) {
        this.accountStatusId = accountStatusId;
    }

    public String getAccountStatusCode() {
        return accountStatusCode;
    }

    public void setAccountStatusCode(String accountStatusCode) {
        this.accountStatusCode = accountStatusCode;
    }

    public String getAccountStatusDetail() {
        return accountStatusDetail;
    }

    public void setAccountStatusDetail(String accountStatusDetail) {
        this.accountStatusDetail = accountStatusDetail;
    }

    public List<Accounts> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Accounts> accounts) {
        this.accounts = accounts;
    }
}
