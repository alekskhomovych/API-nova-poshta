const {
    By
} = require('selenium-webdriver');

const Page = require('./page.js');

var is_register = By.xpath(".//a[@class='reg']//span");
var btn_exit = By.id("exit");
var btn_logout = By.xpath("//div[@id='exitModal']//a[@href='/auth/logout']");
var exit_modal = By.id('exitModal');

var new_order = By.xpath("//a[@href='/newOrder']");

class PersonalCabinetPage extends Page {
    constructor(driver) {
        super(driver);
    }

    async get_actual_register() {
    	return await super.get_text_element(is_register);	
    }

    async log_out() {
    	await super.click(btn_exit);
    	await super.wait_for_element_visible(btn_logout);
    	await super.wait_for_element_coordinates_not_change(btn_logout); 
    	await super.click(btn_logout);    	
    }

    async create_order() {
    	await super.click(new_order);
    }

 }

module.exports = PersonalCabinetPage;
