

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

	async get_sity_ref(api_url, body_request) {
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
};

module.exports = ActionsAPI;
