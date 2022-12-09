package shop.clothesshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import shop.clothesshop.entities.Product;
import shop.clothesshop.entities.Sales;
import shop.clothesshop.entities.adminrespon.AnalysisObject;
import shop.clothesshop.entities.adminrespon.BillAnalysis;
import shop.clothesshop.entities.adminrespon.SalesObject;
import shop.clothesshop.services.AdminServices;

import java.util.List;

@RestController
@RequestMapping(value = "api/product1.0")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class AdminController {
    @Autowired
    private AdminServices adminServices;

    @RequestMapping(method = RequestMethod.GET, value = "searchtop5product", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> searchTop5(@RequestParam String search) {
        return adminServices.searchInShop(search);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getallbilltype")
    public List<BillAnalysis> getAllBillWaiting(@RequestParam int opt) {
        return adminServices.getAllBillByType(opt);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "adminsetbill")
    public void adminSetBill(@RequestParam int opt, int idBill, int idEmployee) {
        adminServices.adminSetBill(opt, idBill, idEmployee);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getanalysisshop")
    public AnalysisObject getAnalysisShop12Month() {
        return adminServices.analysisShop12Month();
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

}
