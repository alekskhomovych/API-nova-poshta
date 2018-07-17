

class ActionsAPI {
	constructor(chai) {
		this.chai = chai;
	}

	async post_request(api_url, body_request) {
		try {
			let result = {};
			await this.chai.request(api_url).post('/')
				.send(body_request)
				.then(function(res) {
					result = res.body;
				});
			return result;
		} catch(err) {
    		console.log(err);
  		}		
	}

	async get_city_ref(api_url, body_request) {
		let responce = await this.post_request(api_url, body_request);
		try {
			return responce['data'][0]['Ref'];
		} catch(err) {
    		console.log(err);
  		}		
  	}

  	async get_warehouses_data(api_url, body_request) {
  		return await this.post_request(api_url, body_request);
  	}

  	async get_waybill_data(api_url, body_request) {
  		return await this.post_request(api_url, body_request);
  	}

  	async fill_waybill_json(waybill_json, test_data, city_ref, city_recipient_ref) {
  		waybill_json['methodProperties']['CitySender'] = city_ref;
  		waybill_json['methodProperties']['CityRecipient'] = city_recipient_ref;
  		waybill_json['methodProperties']['Weight'] = test_data['weight'];
  	  	waybill_json['methodProperties']['ServiceType'] = test_data['service_type'];
  	  	waybill_json['methodProperties']['Cost'] = test_data['cost'];
  		waybill_json['methodProperties']['CargoType'] = test_data['cargo_type'];
  		waybill_json['methodProperties']['SeatsAmount'] = test_data['seats_amount'];
  		return waybill_json;
  	}

};

module.exports = ActionsAPI;
