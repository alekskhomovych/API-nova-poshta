const {
    By
} = require('selenium-webdriver');

// selertors for login

const Page = require('./page.js');

var btn_login = By.css(".logo_in");
var popup_window = By.xpath("//div[@id='popup_login' and contains(@style, 'display: block;')]");

var tab_person = By.xpath("//input[@data-type='person']");
var tab_person_selected = By.xpath("//input[@class='button-tab selected' and @data-type='person']");

var input_login = By.css("#inputEmail");
var input_password = By.css("#inputPassword");
var btn_enter = By.css(".btn");


class MainPage extends Page {
    constructor(driver) {
        super(driver);
    }

    async click_login() {
    	await super.wait_for_element_visible(btn_login);
        await super.click_and_wait(btn_login, popup_window);
    }

    async switch_tab() {
        await super.click_and_wait(tab_person, tab_person_selected);
    }

    async fill_login(login) {
        await super.type(input_login, login);
    }

    async fill_password(password) {
        await super.type(input_password, password);
    }

    async click_enter_btn() {
    	await super.click(btn_enter);
    }
}

module.exports = MainPage;