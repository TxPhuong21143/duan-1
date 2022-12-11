package shop.clothesshop.services;

import Istanbul.QA.libPersonalForImage.ImageMix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.clothesshop.entities.*;
import shop.clothesshop.entities.adminrequest.CreateAndRemakePropertyData;
import shop.clothesshop.entities.adminrequest.CreateProductData;
import shop.clothesshop.entities.adminrequest.HoldBillRequestPayBill;
import shop.clothesshop.entities.adminrespon.*;
import shop.clothesshop.repository.context.DBContext;
import shop.clothesshop.services.iservices.IAdminServices;


import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AdminServices implements IAdminServices {
    @Autowired

    private DBContext dbContext;

    @Override
    public PropertyObject getPropertyObject() {
        PropertyObject po = new PropertyObject();
        po.setBrands(dbContext.brandRepo.findAll());
        po.setColors(dbContext.colorRepo.findAll());
        po.setProducers(dbContext.producerRepo.findAll());
        po.setSizes(dbContext.sizeRepo.findAll());
        po.setCategoryTypes(dbContext.categoryRepo.findAll());
        po.setProductStatuses(dbContext.productStatusRepo.findAll());
        return po;
    }


    @Override
    public CreateAndRemakePropertyData createProperty(CreateAndRemakePropertyData createAndRemakePropertyData) {
        switch (createAndRemakePropertyData.getType()) {
            case 1:
                Color color = new Color();
                color.setColorCode(createAndRemakePropertyData.getCode());
                color.setColorDetail(createAndRemakePropertyData.getDetail());
                dbContext.colorRepo.save(color);
                break;
            case 2:
                Producer producer = new Producer();
                producer.setProducerCode(createAndRemakePropertyData.getCode());
                producer.setProducerDetail(createAndRemakePropertyData.getDetail());
                dbContext.producerRepo.save(producer);
                break;
            case 4:
                Size size = new Size();
                size.setSizeCode(createAndRemakePropertyData.getCode());
                size.setSizeDetail(createAndRemakePropertyData.getDetail());
                dbContext.sizeRepo.save(size);
                break;
            case 3:
                Brand brand = new Brand();
                brand.setBrandCode(createAndRemakePropertyData.getCode());
                brand.setBrandDetail(createAndRemakePropertyData.getDetail());
                dbContext.brandRepo.save(brand);
                break;
            default:
        }
        return createAndRemakePropertyData;
    }

    @Override
    public CreateAndRemakePropertyData remakeProperty(CreateAndRemakePropertyData createAndRemakePropertyData) {
        switch (createAndRemakePropertyData.getType()) {
            case 1:
                Color color = dbContext.colorRepo.findById(createAndRemakePropertyData.getId()).get();
                color.setColorCode(createAndRemakePropertyData.getCode());
                color.setColorDetail(createAndRemakePropertyData.getDetail());
                dbContext.colorRepo.save(color);
                break;
            case 2:
                Producer producer = dbContext.producerRepo.findById(createAndRemakePropertyData.getId()).get();
                producer.setProducerCode(createAndRemakePropertyData.getCode());
                producer.setProducerDetail(createAndRemakePropertyData.getDetail());
                dbContext.producerRepo.save(producer);
                break;
            case 4:
                Size size = dbContext.sizeRepo.findById(createAndRemakePropertyData.getId()).get();
                size.setSizeCode(createAndRemakePropertyData.getCode());
                size.setSizeDetail(createAndRemakePropertyData.getDetail());
                dbContext.sizeRepo.save(size);
                break;
            case 3:
                Brand brand = dbContext.brandRepo.findById(createAndRemakePropertyData.getId()).get();
                brand.setBrandCode(createAndRemakePropertyData.getCode());
                brand.setBrandDetail(createAndRemakePropertyData.getDetail());
                dbContext.brandRepo.save(brand);
                break;
            default:
        }
        return createAndRemakePropertyData;
    }

    @Override
    public void addProduct(MultipartFile file1, MultipartFile file2, CreateProductData data) throws IOException {
        Product p = new Product();
        p.setQuantity(data.getProductQuantity());
        p.setProductName(data.getProductName());
        p.setProductDetail(data.getProductDetail());
        p.setCreateDate(LocalDate.now());
        p.setCategoryTypeId(data.getCategory());
        p.setColorId(data.getColor());
        p.setBrandId(data.getBrand());
        p.setProducerId(data.getProducer());
        p.setSizeId(data.getSize());
        p.setPrice(data.getProductPrice());
        p.setShellPrice(data.getProductShellPrice());
        p.setProductStatusId(1);
        dbContext.productRepo.save(p);
        ProductImg pi1 = new ProductImg();
        pi1.setProductId(p.getProductId());
        pi1.setCountImg(1);
        pi1.setProductImg(ImageMix.image2ByteArray(ImageMix.createImageFromByteArray(file1.getBytes()), "jpg"));
        dbContext.productImgRepo.save(pi1);
        ProductImg pi2 = new ProductImg();
        pi2.setProductId(p.getProductId());
        pi2.setCountImg(2);
        pi2.setProductImg(ImageMix.image2ByteArray(ImageMix.createImageFromByteArray(file2.getBytes()), "jpg"));
        dbContext.productImgRepo.save(pi2);
    }


    @Override
    public List<Product> getByListId(Set<Integer> listId) {
        List<Product> result = new ArrayList<>();
        for (Integer i : listId) {
            result.add(dbContext.productRepo.findById(i).get());
        }
        return result;
    }

    @Override
    public List<Product> getAllProduct() {
        return dbContext.productRepo.findAll();
    }


    @Override
    public Product remakeProduct(Product p) {
        Product product = dbContext.productRepo.findById(p.getProductId()).get();
        product.setShellPrice(p.getShellPrice());
        product.setProductDetail(p.getProductDetail());
        product.setUpdateDate(LocalDate.now());
        product.setProductName(p.getProductName());
        product.setQuantity(p.getQuantity());
        product.setCategoryTypeId(p.getCategoryTypeId());
        product.setColorId(p.getColorId());
        product.setBrandId(p.getBrandId());
        product.setProductStatusId(p.getProductStatusId());
        product.setSizeId(p.getSizeId());
        product.setProducerId(p.getProducerId());
        dbContext.productRepo.save(product);
        return product;
    }


    @Override
    public Bill payBillInShop(AccountShipContact contact, int idEmployee, int billId) {
        contact.setAccountId(41);
        contact.setAccountShipContactStatusId(2);
        dbContext.accountShipContactRepo.save(contact);
        Bill bill = dbContext.billRepo.findById(billId).get();
        bill.setIdEmployee(idEmployee);
        bill.setBillStatusId(7);
        bill.setCloseDateTime(LocalDate.now());
        bill.setShipPrice(0d);
        bill.setShipMethodId(3);
        bill.setAccountShipContactId(contact.getAccountShipContactId());
        dbContext.billRepo.save(bill);
        return bill;
    }

    @Override
    public Bill createBillInShop(int idEmployee) {
        Bill bill = new Bill();
        bill.setIdEmployee(idEmployee);
        bill.setCreateDate(LocalDate.now());
        bill.setBillStatusId(7);
        dbContext.billRepo.save(bill);
        bill.setBillCode("HD" + bill.getBillId());
        dbContext.billRepo.save(bill);
        return bill;
    }

    @Override
    public void removeHodlingBillDetail(int idBillDetail) {
        Optional<BillDetail> billDetailOptional = dbContext.billDetailRepo.findById(idBillDetail);
        if (billDetailOptional.isEmpty()) {
            return;
        }
        dbContext.billDetailRepo.delete(billDetailOptional.get());
    }

    @Override
    public List<Bill> getAllHoldingBill() {
        return dbContext.billRepo.getAllHoldingBill();
    }


    @Override
    public Product findProductById(Integer idProduct) {
        return dbContext.productRepo.findById(idProduct).get();
    }


    @Override
    public HoldBill getAllBillDetailOfBill(Integer idBill) {
        HoldBill hb = new HoldBill();
        Bill bill = dbContext.billRepo.findById(idBill).get();
        List<BillDetailAndProduct> billDetailAndProducts = new ArrayList<>();
        for (BillDetail bd : bill.getBillDetails()) {
            BillDetailAndProduct bdap = new BillDetailAndProduct();
            bdap.setBillDetail(bd);
            if (bill.getCreateDate() != null) {
                bdap.setCreateDate(bill.getCreateDate());
            }
            bdap.setProduct(bd.getProduct());
            billDetailAndProducts.add(bdap);
        }
        hb.setBill(bill);
        hb.setSales(dbContext.salesRepo.getVoucher());
        hb.setBillDetailAndProductList(billDetailAndProducts);
        return hb;
    }

    @Override
    public void addProduct2BillDetail(Integer idProduct, Integer idBill) {
        BillDetail bd = new BillDetail();
        bd.setProductId(idProduct);
        bd.setBillId(idBill);
        bd.setQuantity(1);
        bd.setPrice((double) dbContext.productRepo.findById(idProduct).get().getShellPrice());
        dbContext.billDetailRepo.save(bd);
    }

    @Override
    public void deleteBillDetail(Integer idBillDetail) {
        dbContext.billDetailRepo.deleteById(idBillDetail);
    }


    @Override
    public void updateQuantityBillDetail(Integer idBillDetail, Integer quantity) {
        BillDetail bd = dbContext.billDetailRepo.findById(idBillDetail).get();
        bd.setQuantity(quantity);
        dbContext.billDetailRepo.save(bd);
    }

    @Override
    public Double sumBill(Integer billId) {
        Bill bill = dbContext.billRepo.findById(billId).get();
        Double total = 0d;
        for (BillDetail bd : bill.getBillDetails()) {
            if (bd.getQuantity() == null) {
                continue;
            }
            total += bd.getQuantity() * bd.getPrice();
        }
        return total;
    }

    @Override
    public void payHoldBill(HoldBillRequestPayBill holdBillRequestPayBill) {
        Bill bill = dbContext.billRepo.findById(holdBillRequestPayBill.getIdBill()).get();
        if (holdBillRequestPayBill.getCustomerSdt().trim().length() > 0) {
            AccountShipContact asc = new AccountShipContact();
            asc.setAccountId(41);
            asc.setAccountPhoneNumber(holdBillRequestPayBill.getCustomerSdt().trim());
            asc.setAccountDetailAddress(holdBillRequestPayBill.getCustomAddress());
            asc.setReceiverName(holdBillRequestPayBill.getCustomerName());
            dbContext.accountShipContactRepo.save(asc);
            bill.setAccountShipContactId(asc.getAccountShipContactId());
        }
        bill.setIdEmployee(holdBillRequestPayBill.getIdEmployee());
        bill.setReceivedDate(LocalDate.now());
        bill.setCloseDateTime(LocalDate.now());
        bill.setBillStatusId(3);
        bill.setShipPrice(0d);
        bill.setBuyMethodId(holdBillRequestPayBill.getIdBuyMethod());
        dbContext.billRepo.save(bill);
        if (holdBillRequestPayBill.getIdVoucher() != 0) {
            BillSales bs = new BillSales();
            bs.setSalesId(holdBillRequestPayBill.getIdVoucher());
            bs.setBillId(bill.getBillId());
            dbContext.billSalesRepo.save(bs);
        }
        for (BillDetail bd : bill.getBillDetails()) {
            Product p = dbContext.productRepo.findById(bd.getProductId()).get();
            p.setQuantity(p.getQuantity() - bd.getQuantity());
            dbContext.productRepo.save(p);
        }
    }

    @Override
    public PrintBillData printBillData(Integer idBill) {
        Bill bill = dbContext.billRepo.findById(idBill).get();
        PrintBillData printBillData = new PrintBillData();
        if (bill.getAccountShipContact() != null) {
            printBillData.setReveceiAddress(bill.getAccountShipContact().getAccountDetailAddress());
            printBillData.setReveceiName(bill.getAccountShipContact().getReceiverName());
            printBillData.setReveceiSdt(bill.getAccountShipContact().getAccountPhoneNumber());
        }
        if (bill.getShipPrice() != null) {
            printBillData.setShipPrice(bill.getShipPrice());
        } else {
            printBillData.setShipPrice(0d);
        }
        List<BillDetailPrint> billDetailPrints = new ArrayList<>();
        Double total = 0d;
        for (BillDetail bd : bill.getBillDetails()) {
            BillDetailPrint bdp = new BillDetailPrint();
            bdp.setPrice(bd.getPrice());
            bdp.setProductName(bd.getProduct().getProductDetail());
            bdp.setQuantity(bd.getQuantity());
            total += bd.getQuantity() * bd.getPrice();
            billDetailPrints.add(bdp);
        }
        printBillData.setTotal(total);
        printBillData.setBillDetailPrints(billDetailPrints);
        for (BillSales bs : bill.getBillSalesList()) {
            if (bs.getSales().getSaleTypeId() == 1) {
                printBillData.setFreeShip((double) bs.getSales().getSalesInt() + bs.getSales().getSalesPercent());
            }
            if (bs.getSales().getSaleTypeId() == 2) {
                printBillData.setVoucher((double) bs.getSales().getSalesInt() + bs.getSales().getSalesPercent());
            }
        }
        Double totalResult = total;
        if (printBillData.getFreeShip() != null) {
            if (printBillData.getFreeShip() < 100) {
                totalResult -= (printBillData.getFreeShip() * total) / 100;
            }
            if (printBillData.getFreeShip() > 100) {
                totalResult -= printBillData.getFreeShip();
            }
        }
        if (printBillData.getVoucher() != null) {
            if (printBillData.getVoucher() < 100) {
                totalResult -= (printBillData.getVoucher() * total) / 100;
            }
            if (printBillData.getVoucher() > 100) {
                totalResult -= printBillData.getVoucher();
            }
        }
        printBillData.setTotalResult(totalResult);
        if (bill.getShipPrice() != null) {
            printBillData.setTotalResult(totalResult + bill.getShipPrice());
        }
        printBillData.setBillCode(bill.getBillCode());
        printBillData.setEmployeeName(bill.getEmployee().getName());
        printBillData.setCloseDate(bill.getCloseDateTime());
        return printBillData;
    }
     @Override
    public void adminSetBill(int opt, int billId, int idEmployee) {
        if (opt == 1) {
            Bill bill = dbContext.billRepo.findById(billId).get();
            bill.setBillStatusId(6);
            bill.setCloseDateTime(LocalDate.now());
            bill.setIdEmployee(idEmployee);
            dbContext.billRepo.save(bill);
            return;
        }
        if (opt == 2) {
            Bill bill = dbContext.billRepo.findById(billId).get();
            bill.setBillStatusId(2);
            bill.setIdEmployee(idEmployee);
            bill.setShipToBuyerDate(LocalDate.now().plusDays(5));
            for (BillDetail bd : bill.getBillDetails()) {
                Product p = dbContext.productRepo.findById(bd.getProductId()).get();
                p.setQuantity(p.getQuantity() - bd.getQuantity());
                dbContext.productRepo.save(p);
            }
            dbContext.billRepo.save(bill);
            return;
        }
    }



    @Override
    public List<BillAnalysis> getAllBillByType(int type) {
        List<Bill> billList = new ArrayList<>();
        if (type == 1) {
            billList = dbContext.billRepo.getAllBillWaitting();
        }
        if (type == 2) {
            billList = dbContext.billRepo.getAllBillShipping();
        }
        if (type == 3) {
            billList = dbContext.billRepo.getAllBillShipped();
        }
        List<BillAnalysis> billAnalysis = new ArrayList<>();
        for (Bill bill : billList) {
            BillAnalysis ba = new BillAnalysis();
            if (bill.getBillSalesList() != null) {
                for (BillSales s : bill.getBillSalesList()) {
                    if (s.getSales().getSaleTypeId() == 1) {
                        ba.setVoucherShipCode(s.getSales().getSalesCode());
                        ba.setShipVoucher(s.getSales().getSalesInt() + s.getSales().getSalesPercent());
                    }
                    if (s.getSales().getSaleTypeId() == 2) {
                        ba.setVoucherCode(s.getSales().getSalesCode());
                        ba.setVoucherVoucher(s.getSales().getSalesInt() + s.getSales().getSalesPercent());
                    }
                }
            }
            ba.setBillStatusId(bill.getBillStatusId());
            ba.setBuyStatus("Chưa Thanh Toán");
            ba.setShipStatus("Đang Giao");
            if (type == 3) {
                ba.setCloseDate(bill.getCloseDateTime());
                ba.setReveceiDate(bill.getReceivedDate());
                ba.setBuyStatus("Đã Thanh Toán");
                ba.setShipStatus("Đã Nhận Hàng");
            }
            if (type == 1) {
                ba.setShipStatus("Đơn Chờ");
            }
            ba.setReveceiContact(bill.getAccountShipContact().getAccountDetailAddress());
            ba.setReveceiMethod(bill.getShipMethod().getShipMethodName());
            ba.setBuyMethod(bill.getBuyMethod().getBuyMethodName());
            ba.setBillStatus(bill.getBillStatus().getBillStatusDetail());
            ba.setNotification(bill.getBuyerNotification());
            ba.setBillId(bill.getBillId());
            ba.setCreateBill(bill.getCreateDate());
            ba.setBillCode(bill.getBillCode());
            ba.setCustomerName(bill.getAccountShipContact().getAccount().getName());
            ba.setReveceiName(bill.getAccountShipContact().getReceiverName());
            ba.setReveceiSdt(bill.getAccountShipContact().getAccountPhoneNumber());
            ba.setIdCustomer(bill.getAccountShipContact().getAccount().getAccountId());
            ba.setShipMethodName(bill.getShipMethod().getShipMethodName());
            ba.setShipPrice(bill.getShipPrice());
            List<BillDetailAnalysis> bdaList = new ArrayList<>();
            Double total = 0d;
            for (BillDetail bd : bill.getBillDetails()) {
                BillDetailAnalysis bda = new BillDetailAnalysis();
                bda.setBillDetailId(bd.getBillDetailId());
                bda.setQuantity(bd.getQuantity());
                bda.setQuantityInventory(bd.getProduct().getQuantity());
                bda.setProductImg(bd.getProduct().getProductImgs().get(0).getProductImg());
                bda.setProductName(bd.getProduct().getProductName());
                bda.setShellprice(bd.getProduct().getShellPrice());
                bda.setTotal(bda.getShellprice() * bda.getQuantity());
                total += bda.getTotal();
                bdaList.add(bda);
            }
            ba.setTotalBill(total);
            ba.setBillDetailAnalyses(bdaList);
            billAnalysis.add(ba);
        }
        return billAnalysis;
    }

    @Override
    public List<Product> searchInShop(String search) {
        return dbContext.productRepo.searchProductTop5(search);
    }

    @Override
    public AnalysisObject analysisShop12Month() {
        AnalysisObject ao = new AnalysisObject();
        ao.setProductCountShelling(dbContext.productRepo.productShellingTotal());
        ao.setCustumerCountActive(dbContext.accountRepo.custumerActiveTotal());
        ao.setVoucherCountUsing(dbContext.salesRepo.salesUsingTotal());
        ao.setProductQuantityInventory(dbContext.productRepo.countProductInventory());
        List<Integer> top5ProductSoldId = dbContext.productRepo.top5ProductSold();
        List<TopProductSold> top5ProductSold = new ArrayList<>();
        for (int id : top5ProductSoldId) {
            TopProductSold tps = new TopProductSold();
            Product p = dbContext.productRepo.findById(id).get();
            tps.setInventory(p.getQuantity());
            tps.setName(p.getProductName());
            tps.setProductCode(p.getProductCode());
            List<BillDetail> allBillDetailOfThisProduct = dbContext.billDetailRepo.allBillDetailOfProductBillShipped(id);
            Integer soldQuantity = 0;
            for (BillDetail bd : allBillDetailOfThisProduct) {
                soldQuantity += bd.getQuantity();
            }
            tps.setSold(soldQuantity);
            top5ProductSold.add(tps);
        }
        ao.setTop5ProductSold(top5ProductSold);

        List<Integer> top5AccountPaidId = dbContext.billDetailRepo.top5AccountPaid();
        List<TopAccountPaid> top5AccountPaid = new ArrayList<>();
        for (int id : top5AccountPaidId) {
            TopAccountPaid tap = new TopAccountPaid();
            Accounts a = dbContext.accountRepo.findById(id).get();
            tap.setAccountCode(a.getAccountCode());
            tap.setSdt(a.getSdt());
            tap.setName(a.getName());
            tap.setTotalPaid(dbContext.billDetailRepo.getTotalPaidByIdAccount(id));
            top5AccountPaid.add(tap);
        }
        ao.setTop5AccountPaid(top5AccountPaid);
        List<Integer> totalBillMonthByMonth = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            totalBillMonthByMonth.add(dbContext.billRepo.countBillInMonth(i));
        }
        ao.setTotalBillMonth(totalBillMonthByMonth);
        List<MonthAnalysis> monthAnalyses = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            MonthAnalysis ma = new MonthAnalysis();
            ma.setShippedBillTotal(dbContext.billRepo.countShippedBillByMonth(i));
            ma.setSoldTotal(dbContext.billRepo.soldTotalByMonth(i));
            List<Bill> shippedBillInMonth = dbContext.billRepo.getAllBillShippedInMonth(i);
            Double profit = 0d;
            for (Bill b : shippedBillInMonth) {
                Double totalThisBill = 0d;
                Double totalPrice = 0d;
                Double freeShip = 0d;
                Double voucher = 0d;
                for (BillDetail bd : b.getBillDetails()) {
                    totalThisBill += bd.getPrice() * bd.getQuantity();
                    totalPrice += bd.getProduct().getPrice() * bd.getQuantity();
                }
                for (BillSales bs : b.getBillSalesList()) {
                    if (bs.getSales().getSaleTypeId() == 1) {
                        freeShip = (double) bs.getSales().getSalesInt();
                    }
                    if (bs.getSales().getSaleTypeId() == 2) {
                        voucher = (double) bs.getSales().getSalesInt() + bs.getSales().getSalesPercent();
                    }
                }
                if (voucher > 100) {
                    totalThisBill -= voucher;
                } else {
                    totalThisBill -= totalThisBill * voucher / 100;
                }
                totalThisBill -= freeShip;
                totalThisBill -= totalPrice;
                ma.setProfitBefore(totalThisBill);
                ma.setBackBillTotal(dbContext.billRepo.totalBillBack(i));
                ma.setShipLossTotal(dbContext.billRepo.totalShipLoss(i));
                if (ma.getShipLossTotal() != null) {
                    ma.setResultProfit(totalThisBill - ma.getShipLossTotal());
                } else {
                    ma.setResultProfit(totalThisBill);
                }
            }
            monthAnalyses.add(ma);
        }
        ao.setAnalysisProfit12Month(monthAnalyses);
        return ao;
    }

    @Override
    public SalesObject getAllSales() {
        SalesObject so = new SalesObject();
        so.setShipVouchers(dbContext.salesRepo.getShipVoucher());
        so.setVoucherVouchers(dbContext.salesRepo.getVoucher());
        return so;
    }

    @Override
    public void createVoucher(Sales data) {
        data.setSalessStatusId(1);
        dbContext.salesRepo.save(data);
    }

    @Override
    public void closeVoucher(int idVoucher) {
        Sales s = dbContext.salesRepo.findById(idVoucher).get();
        if (s.getSalessStatusId() == 3) {
            s.setSalessStatusId(1);
        } else {
            s.setSalessStatusId(3);
        }
        dbContext.salesRepo.save(s);
    }
}
