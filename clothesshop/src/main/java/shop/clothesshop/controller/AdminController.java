package shop.clothesshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shop.clothesshop.entities.adminrespon.BillAnalysis;
import shop.clothesshop.services.AdminServices;

import java.util.List;

@RestController
@RequestMapping(value = "api/product1.0")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class AdminController {
    @Autowired
    private AdminServices adminServices;


    @RequestMapping(method = RequestMethod.GET, value = "getallbilltype")
    public List<BillAnalysis> getAllBillWaiting(@RequestParam int opt) {
        return adminServices.getAllBillByType(opt);
    }
    @RequestMapping(method = RequestMethod.PUT, value = "adminsetbill")
    public void adminSetBill(@RequestParam int opt, int idBill, int idEmployee) {
        adminServices.adminSetBill(opt, idBill, idEmployee);
    }
}
