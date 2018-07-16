const {
    By
} = require('selenium-webdriver');

const Page = require('./page.js');

var template_name = By.xpath("//tbody/tr[1]//strong[@class='templateDescription']");

var check_all = By.css('.orderCheckAll');
var check_row = By.xpath("//tbody/tr[1][@class='ordersList active']");

var btn_remove_templates = By.xpath("//i[@class='icon-trash']/parent::a[not (@data-ref)]");

class TemplatesPage extends Page {
    constructor(driver) {
        super(driver);
    }

    async get_template_name() {
    	return await super.get_text_element(template_name);
    }

    async remove_templates() {
    	await super.click_and_wait(check_all, check_row);
    	await super.click(btn_remove_templates);
    }
}

module.exports = TemplatesPage;
