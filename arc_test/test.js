"use strict";

var webdriver = require('selenium-webdriver');
var assert = require('assert')

const MainPage = require('../core/pages/main_page.js');
const PesonalCabinetPage = require('../core/pages/personal_cabinet_page.js');
const OrderPage = require('../core/pages/order_page.js');
const TemplatesPage = require('../core/pages/templates_page.js');
const config_reader = require('../core/utils/config_reader.js');
const data_reader = require('../core/utils/data_reader.js');

var driver = new webdriver.Builder().usingServer().withCapabilities({'browserName':  config_reader.get_browser()}).build();

let mainPage = new MainPage(driver);
let personalCabinetPage = new PesonalCabinetPage(driver);
let orderPage = new OrderPage(driver);
let templatesPage = new TemplatesPage(driver);

describe('Nova pochta. UI tests', function() {
	this.timeout(config_reader.get_timeout());

	// ============ Preconditions =======================
	before(async function() {
		await mainPage.open_page(config_reader.get_url());
    });	

	beforeEach(async function() {
		await mainPage.click_login();
		await mainPage.switch_tab();
		await mainPage.fill_login(data_reader.get_login());
		await mainPage.fill_password(data_reader.get_password());
		await mainPage.click_enter_btn();
  	});

	// ============ Tests ===============================
	it(' As a user I want to login to my cabinet on Nova Poshta', async function() {
		let expected_user = await data_reader.get_login();
		let actual_user = await personalCabinetPage.get_actual_register();
		await assert.equal(expected_user, actual_user, 'Assert failed. Expected: ' + expected_user + ' but found ' + actual_user);
	});

	it('As a new customer I want to create waybill template in my personal cabinet', async function() {
		let expected_template_name = data_reader.get_template_name();

		await personalCabinetPage.create_order();
		await orderPage.select_sender();
		await orderPage.fill_sity_sender(data_reader.get_city_sender());
		await orderPage.click_on_select();
		await orderPage.click_on_create_template();
		await orderPage.create_template(expected_template_name);

		let actual_template_name = await templatesPage.get_template_name();
		
		await assert.equal(expected_template_name, actual_template_name, 'Assert failed. Expected: ' + expected_template_name + ' but found ' + actual_template_name);
		await templatesPage.remove_templates();
	});

	// ============ Postconditions =====================
	afterEach(async function() {
		await personalCabinetPage.log_out();
    });

	after(function() {
		mainPage.driver_quite();
    });	
});

