package shop.clothesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.clothesshop.entities.Bill;
import shop.clothesshop.entities.BillDetail;
import shop.clothesshop.entities.BillSales;
import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.adminrespon.BillAnalysis;
import shop.clothesshop.entities.adminrespon.BillDetailAnalysis;
import shop.clothesshop.repository.context.DBContext;
import shop.clothesshop.services.iservices.IAdminServices;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServices implements IAdminServices {
    @Autowired
private DBContext dbContext;
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
}
