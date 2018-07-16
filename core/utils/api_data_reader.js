var fs=require('fs');
var api_config=fs.readFileSync('./config_api.json', 'utf8');
var api_config_words=JSON.parse(api_config);

var api_data=fs.readFileSync('./data/data_api.json', 'utf8');
var api_data_words=JSON.parse(api_data);

var get_api_url = function() {
	return api_config_words['api_url'];
}

var get_setelements_data = function() {
	let setelements_words = api_data_words['api_methods']['getSettlements'];
	setelements_words['methodProperties']['FindByString'] = api_data_words['sity'];
	setelements_words['apiKey'] = api_config_words['apiKey'];
	return setelements_words;
}

var get_setelements_recipient = function(city_recipient) {
	let setelements_words = api_data_words['api_methods']['getSettlements'];
	setelements_words['methodProperties']['FindByString'] = city_recipient;
	setelements_words['apiKey'] = api_config_words['apiKey'];
	return setelements_words;
}

var get_warehouses_data = function() {
	let warehouses_words = api_data_words['api_methods']['getWarehouses'];
	warehouses_words['apiKey'] = api_config_words['apiKey'];
	return warehouses_words;
}


var get_timeout = function() {
	return api_config_words['timeout'] * 1000;
}

var get_waybill_data = function() {
	let waybill_data = api_data_words['waybill'];
	return waybill_data;
}

var get_document_price = function() {
	let document_price = api_data_words['api_methods']['getDocumentPrice'];
	document_price['apiKey'] = api_config_words['apiKey'];
	return document_price;
}

module.exports.get_api_url = get_api_url;
module.exports.get_setelements_data = get_setelements_data;
module.exports.get_warehouses_data = get_warehouses_data;
module.exports.get_timeout = get_timeout;
module.exports.get_waybill_data = get_waybill_data;
module.exports.get_document_price = get_document_price;
module.exports.get_setelements_recipient = get_setelements_recipient;
