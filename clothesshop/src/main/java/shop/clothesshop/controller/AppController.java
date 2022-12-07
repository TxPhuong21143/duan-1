package shop.clothesshop.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/product1.0")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class AppController {
}
