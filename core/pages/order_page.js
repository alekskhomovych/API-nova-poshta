const {
    By
} = require('selenium-webdriver');

const Page = require('./page.js');

var btn_sender = By.id('SenderSelectButton');
var counter_modal = By.id('selectCounterpartyModal');

var sity_sender = By.id('filter_journal_cities');
var contacts_list = By.xpath("//ul[@id='contacts_ul']//li[1]");

var btn_select = By.id('selectCounterpartyButton');

var btn_create_template = By.id('submitNewTemplateButton');
var template_description = By.id('TemplateDescription');
var btn_template_description = By.id('btnTemplateDescription');

var btn_templates_list = By.xpath("//a[@href='/orders/templates/filter/clear']");

var btn_enter_state = By.xpath(".//button[@id='selectCounterpartyButton' and contains(@class, 'disabled')]")

class OrderPage extends Page {
    constructor(driver) {
        super(driver);
    }

    async select_sender() {
    	await super.click_and_wait(btn_sender, counter_modal);
    }

    async fill_sity_sender(sity) {
    	await super.type(sity_sender, sity);
    }

    async click_on_select() {
		await super.wait_for_element_state(btn_enter_state);
    	await super.click(btn_select);
    }

    async click_on_create_template() {
    	await super.click(btn_create_template);
    }

    async create_template(template_name) {
    	await super.wait_for_element_visible(template_description);
		await super.wait_for_element_coordinates_not_change(template_description);
    	await super.type(template_description, template_name);
    	await super.click(btn_template_description);
		await super.wait_for_element_coordinates_not_change(btn_templates_list);
		await super.click(btn_templates_list);
    }

}

module.exports = OrderPage;
