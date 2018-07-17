process.env.NODE_ENV = 'test';

let chai = require('chai');
const forEach = require('mocha-each');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

var ActionsAPI = require('../core/actions/actions_api.js');
let actionsAPI = new ActionsAPI(chai, chaiHttp);

let apiData = require('../core/utils/api_data_reader.js');

describe('/POST API Nova Poshta', async function() {
	this.timeout(apiData.get_timeout());

	it('As a developer I want to get list of nearest departments through the API ', async function() {
		let city_ref = await actionsAPI.get_city_ref(apiData.get_api_url(), apiData.get_setelements_data());

		let warehouses_json = apiData.get_warehouses_data();
		warehouses_json['methodProperties']['SettlementRef'] = city_ref;

		let warehouses_data = await actionsAPI.get_warehouses_data(apiData.get_api_url(), warehouses_json);

		warehouses_data.should.have.property('data');
		warehouses_data.should.have.property('success').eql(true);
  });      

  forEach(apiData.get_waybill_data())
    .it('As a developer I want to create express waybill through the API',
  	 async function(test_data) {
  		  let city_ref = await actionsAPI.get_city_ref(apiData.get_api_url(), apiData.get_setelements_data());
  		  let city_recipient_ref = await actionsAPI.get_city_ref(apiData.get_api_url(), apiData.get_setelements_recipient(test_data['city_recipient']));

  		  let waybill_json = apiData.get_document_price();
        let waybill = await actionsAPI.fill_waybill_json(waybill_json, test_data, city_ref, city_recipient_ref);
  		  let waybill_data = await actionsAPI.get_waybill_data(apiData.get_api_url(), waybill);

        waybill_data.should.have.property('success').eql(test_data['expected']);
	 });
});
