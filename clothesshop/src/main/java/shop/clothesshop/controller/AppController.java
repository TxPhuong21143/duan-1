package shop.clothesshop.controller;

public class AppController {
    @Autowired
private AppServices appServices;
    @RequestMapping(method = RequestMethod.GET, value = "checklogin")
    public AccountCustom checkLogin(@RequestParam String userName, String userPass) {
        return appServices.checkLogin(userName, userPass);
    }

}
