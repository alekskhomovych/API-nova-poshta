process.env.NODE_ENV = 'test';

let chai = require('chai');
const forEach = require('mocha-each');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

var ActionsAPI = require('../core/actions/actions_api.js');
let actionsAPI = new ActionsAPI(chai, chaiHttp);

let apiData = require('../core/utils/api_data_reader.js');

describe('', async function() {
	this.timeout(apiData.get_timeout());

	it('/POST API Nova Poshta', async function() {
		let sity_ref = await actionsAPI.get_sity_ref(apiData.get_api_url(), apiData.get_setelements_data());

		let warehouses_json = apiData.get_warehouses_data();
		warehouses_json['methodProperties']['SettlementRef'] = sity_ref;

		let warehouses_data = await actionsAPI.get_warehouses_data(apiData.get_api_url(), warehouses_json);

		warehouses_data.should.have.property('data');
		warehouses_data.should.have.property('success').eql(true);
      });      

  describe('Nova Poshta waybill', async function() {
    forEach(apiData.get_waybill_data())
    .it('As a developer I want to create express waybill through the API',
  	 async function(test_data) {
  		  let city_ref = await actionsAPI.get_sity_ref(apiData.get_api_url(), apiData.get_setelements_data());
  		  let city_recipient_ref = await actionsAPI.get_sity_ref(apiData.get_api_url(), apiData.get_setelements_recipient(test_data['city_recipient']));

  		  let waybill_json = apiData.get_document_price();
  		  waybill_json['methodProperties']['CitySender'] = city_ref;
  		  waybill_json['methodProperties']['CityRecipient'] = city_recipient_ref;
  		  waybill_json['methodProperties']['Weight'] = test_data['weight'];
  		  waybill_json['methodProperties']['ServiceType'] = test_data['service_type'];
  		  waybill_json['methodProperties']['Cost'] = test_data['cost'];
  		  waybill_json['methodProperties']['CargoType'] = test_data['cargo_type'];
  		  waybill_json['methodProperties']['SeatsAmount'] = test_data['seats_amount'];

  		  let waybill_data = await actionsAPI.get_waybill_data(apiData.get_api_url(), waybill_json);

        waybill_data.should.have.property('success').eql(true);
	 });
  });
});
