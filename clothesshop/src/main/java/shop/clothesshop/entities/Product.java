package shop.clothesshop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Table(name = "product")
@Entity
public class Product {
    @Id
    @Column(name = "productid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    @Column(name="productcode")
    private String productCode;
    @Column(name = "categorytypeid")
    private Integer categoryTypeId;
    @ManyToOne
    @JoinColumn(name = "categorytypeid", insertable = false, updatable = false)
    @JsonBackReference
    private CategoryType categoryType;
    @Column(name = "productname")
    private String productName;
    @Column(name = "productdetail")
    private String productDetail;
    @Column(name = "sizeid")
    private Integer sizeId;
    @Column(name = "colorid")
    private Integer colorId;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "colorid", insertable = false, updatable = false)
    private Color color;
    @ManyToOne
    @JoinColumn(name = "sizeid", insertable = false, updatable = false)
    @JsonBackReference
    private Size size;
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<VoteStar> voteStars;
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProductImg> productImgs;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @JsonManagedReference
    private List<BillDetail> billDetails;
    @Column(name = "producerid")
    private Integer producerId;
    @Column(name = "brandid")
    private Integer brandId;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "brandid", insertable = false, updatable = false)
    private Brand brand;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "producerid", insertable = false, updatable = false)
    private Producer producer;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "price")
    private Integer price;
    @Column(name = "shellprice")
    private Integer shellPrice;
    @Column(name = "createdate")
    private LocalDate createDate;
    @Column(name = "updatedate")
    private LocalDate updateDate;
    @Column(name = "productstatusid")
    private Integer productStatusId;
    @ManyToOne
    @JoinColumn(name = "productstatusid", insertable = false, updatable = false)
    @JsonBackReference
    private ProductStatus productStatus;

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Integer getProductStatusId() {
        return productStatusId;
    }

    public void setProductStatusId(Integer productStatusId) {
        this.productStatusId = productStatusId;
    }

    public ProductStatus getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(ProductStatus productStatus) {
        this.productStatus = productStatus;
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

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getCategoryTypeId() {
        return categoryTypeId;
    }

    public void setCategoryTypeId(Integer categoryTypeId) {
        this.categoryTypeId = categoryTypeId;
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDetail() {
        return productDetail;
    }

    public void setProductDetail(String productDetail) {
        this.productDetail = productDetail;
    }

    public Integer getSizeId() {
        return sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }


    public List<VoteStar> getVoteStars() {
        return voteStars;
    }

    public void setVoteStars(List<VoteStar> voteStars) {
        this.voteStars = voteStars;
    }

    public List<ProductImg> getProductImgs() {
        return productImgs;
    }

    public void setProductImgs(List<ProductImg> productImgs) {
        this.productImgs = productImgs;
    }

    public List<BillDetail> getBillDetails() {
        return billDetails;
    }

    public void setBillDetails(List<BillDetail> billDetails) {
        this.billDetails = billDetails;
    }

    public Integer getProducerId() {
        return producerId;
    }

    public void setProducerId(Integer producerId) {
        this.producerId = producerId;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Producer getProducer() {
        return producer;
    }

    public void setProducer(Producer producer) {
        this.producer = producer;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getShellPrice() {
        return shellPrice;
    }

    public void setShellPrice(Integer shellPrice) {
        this.shellPrice = shellPrice;
    }
}
