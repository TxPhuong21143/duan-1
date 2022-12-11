package shop.clothesshop.controller;

import HaNoi.QA.libPersonalForList.GsonMix;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.clothesshop.entities.AccountShipContact;
import shop.clothesshop.entities.Bill;
import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.Sales;
import shop.clothesshop.entities.adminrequest.CreateAndRemakePropertyData;
import shop.clothesshop.entities.adminrequest.CreateProductData;
import shop.clothesshop.entities.adminrequest.HoldBillRequestPayBill;
import shop.clothesshop.entities.adminrespon.*;
import shop.clothesshop.services.AdminServices;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "api/admin1.0")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class AdminController {
    @Autowired
    private AdminServices adminServices;

    @RequestMapping(method = RequestMethod.GET, value = "getanalysisshop")
    public AnalysisObject getAnalysisShop12Month() {
        return adminServices.analysisShop12Month();
    }

    @RequestMapping(method = RequestMethod.GET, value = "getallproperty")
    public PropertyObject getAllProperty() {
        return adminServices.getPropertyObject();
    }

    @RequestMapping(method = RequestMethod.POST, value = "createproperty")
    public CreateAndRemakePropertyData createProperty(@RequestBody String data) {
        Gson gson = new Gson();
        CreateAndRemakePropertyData cpd = gson.fromJson(data, CreateAndRemakePropertyData.class);
        return adminServices.createProperty(cpd);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "remakeproperty")
    public CreateAndRemakePropertyData remakeProperty(@RequestBody String data) {
        System.out.println(data);
        Gson gson = new Gson();
        CreateAndRemakePropertyData cpd = gson.fromJson(data, CreateAndRemakePropertyData.class);
        return adminServices.remakeProperty(cpd);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getallbilltype")
    public List<BillAnalysis> getAllBillWaiting(@RequestParam int opt) {
        return adminServices.getAllBillByType(opt);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "adminsetbill")
    public void adminSetBill(@RequestParam int opt, int idBill, int idEmployee) {
        adminServices.adminSetBill(opt, idBill, idEmployee);
    }

    @RequestMapping(method = RequestMethod.POST, value = "upload")
    public void upload(@RequestPart("file1") MultipartFile data1, @RequestPart("file2") MultipartFile data2, @RequestPart("data") String data) throws IOException {
        Gson gson = GsonMix.gsonLocalDate();
        CreateProductData cpd = gson.fromJson(data, CreateProductData.class);
        adminServices.addProduct(data1, data2, cpd);
    }

    @RequestMapping(method = RequestMethod.GET, value = "sales", produces = MediaType.APPLICATION_JSON_VALUE)
    public SalesObject getSales() {
        return adminServices.getAllSales();
    }

    @RequestMapping(method = RequestMethod.POST, value = "createsales", produces = MediaType.APPLICATION_JSON_VALUE)
    public void addNewSales(@RequestBody String data) {
        Sales sales = GsonMix.gsonLocalDate().fromJson(data, Sales.class);
        adminServices.createVoucher(sales);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "closeoropen", produces = MediaType.APPLICATION_JSON_VALUE)
    public void closeOrOpen(@RequestParam int idVoucher) {
        adminServices.closeVoucher(idVoucher);
    }

    @RequestMapping(method = RequestMethod.GET, value = "searchtop5product", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> searchTop5(@RequestParam String search) {
        return adminServices.searchInShop(search);
    }

    @RequestMapping(method = RequestMethod.POST, value = "getbylist", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> getListById(@RequestBody Integer[] listId) {
        Set<Integer> list = new HashSet<>();
        for (Integer i : listId) {
            list.add(i);
        }
        return adminServices.getByListId(list);
    }

    @RequestMapping(method = RequestMethod.POST, value = "remakeproduct", produces = MediaType.APPLICATION_JSON_VALUE)
    public Product remakeProduct(@RequestBody String data) {
        Product p = GsonMix.gsonLocalDate().fromJson(data, Product.class);
        return adminServices.remakeProduct(p);
    }

    @RequestMapping(method = RequestMethod.POST, value = "shellinshop", produces = MediaType.APPLICATION_JSON_VALUE)
    public Bill payBillInShop(@RequestBody String data, @RequestParam int idEmployee, int billId) {
        AccountShipContact asc = GsonMix.gsonLocalDate().fromJson(data, AccountShipContact.class);
        return adminServices.payBillInShop(asc, idEmployee, billId);
    }

    //
    @RequestMapping(method = RequestMethod.POST, value = "createbillinshop", produces = MediaType.APPLICATION_JSON_VALUE)
    public Bill payBillInShop(@RequestParam int idEmployee) {

        return adminServices.createBillInShop(idEmployee);
    }

    //
    @RequestMapping(method = RequestMethod.GET, value = "deletebilldetail", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteBillDetailHolding(@RequestParam int idBillDetail) {
        adminServices.removeHodlingBillDetail(idBillDetail);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getallholdingbill", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Bill> getAllHoldingBill() {
        return adminServices.getAllHoldingBill();
    }

    @RequestMapping(method = RequestMethod.GET, value = "findproductbyid", produces = MediaType.APPLICATION_JSON_VALUE)
    public Product findProductById(@RequestParam int idProduct) {
        return adminServices.findProductById(idProduct);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getallbilldetailofbill", produces = MediaType.APPLICATION_JSON_VALUE)
    public HoldBill getAllBillDetailOfBill(@RequestParam Integer idBill) {
        return adminServices.getAllBillDetailOfBill(idBill);
    }

    @RequestMapping(method = RequestMethod.GET, value = "addproduct2billdetail", produces = MediaType.APPLICATION_JSON_VALUE)
    public void addProduct2BillDetail(@RequestParam Integer idBill, Integer idProduct) {
        adminServices.addProduct2BillDetail(idProduct, idBill);
    }

    @RequestMapping(method = RequestMethod.GET, value = "deletebilldetail2", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteBillDetail(@RequestParam Integer idBillDetail) {
        adminServices.deleteBillDetail(idBillDetail);
    }

    @RequestMapping(method = RequestMethod.GET, value = "updatebilldetailquantity", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateBillDetailQuantity(@RequestParam Integer idBillDetail, Integer quantity) {
        adminServices.updateQuantityBillDetail(idBillDetail, quantity);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getsumbill", produces = MediaType.APPLICATION_JSON_VALUE)
    public Double getSumBill(@RequestParam Integer idBill) {
        return adminServices.sumBill(idBill);
    }

    @RequestMapping(method = RequestMethod.POST, value = "getpaybillrequest", produces = MediaType.APPLICATION_JSON_VALUE)
    public void getPayBillRequest(@RequestBody String data) {
        HoldBillRequestPayBill holdBillRequestPayBill = GsonMix.gsonLocalDate().fromJson(data, HoldBillRequestPayBill.class);
        adminServices.payHoldBill(holdBillRequestPayBill);
    }

    @RequestMapping(method = RequestMethod.GET, value = "printbill", produces = MediaType.APPLICATION_JSON_VALUE)
    public PrintBillData printBill(@RequestParam Integer idBill) {
        return adminServices.printBillData(idBill);
    }
}

