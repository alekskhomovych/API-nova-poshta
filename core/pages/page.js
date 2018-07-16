const {By, until} = require('selenium-webdriver');

class Page {
	constructor(driver) {
		this.driver = driver;

		const TIMEOUT = 8000;
		const PAGE_LOAD = 10000;
	}

	async click_and_wait(element_to_click, element_to_wait) {
		try {		
        	await this.driver.then(driver => driver.findElement(element_to_click)
        		.then(element => element.click())
        		.then(() => driver.wait(until.elementLocated(element_to_wait, this.TIMEOUT)))
        		.then(() => driver.wait(until.elementIsVisible(driver.findElement(element_to_wait)), this.TIMEOUT)));
		} catch(err) {
    		console.log(err);
  		}			        	
	}

	async click(element) {
		try {
			await this.driver.then(driver => driver.findElement(element)
				.then(element => element.click()));
		} catch(err) {
    		console.log(err);
  		}		
	}

	async type (element, text) {
		try {		
			await this.driver.then(driver => driver.findElement(element).then(element => element.sendKeys(text)));
		} catch(err) {
    		console.log(err);
  		}
	}

	async open_page(url) {
		try {
			await this.driver.get(url);
			await this.driver.wait(until.urlContains(url), this.PAGE_LOAD);
		} catch(err) {
    		console.log(err);
  		}			
	}

	async get_text_element(element) {
		try {
			return await this.driver.then(driver => driver.findElement(element).then(element => element.getText()));
		} catch(err) {
    		console.log(err);
  		}
  		return "none";
	}

	sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

  	async get_element_top_offset(element) {
  		let el = await this.driver.findElement(element);
  		return await this.driver.executeScript("return arguments[0].offsetTop;", el);
  	}

	driver_quite() {
		this.driver.quit();
	}

	async is_button_not_found(element) {
		try {
    		await driver.findElement(element).isDisplayed();
    		return false;
		} catch (err) {
    		return true;
		}
	}

	// ===================  Waits ========================
	async wait_for_element_state(element) {
		try {
			await this.driver.wait(until.elementLocated(element, this.TIMEOUT));
			await this.wait_element_not_found(element);
		} catch(err) {
			console.log(err);
		}				
	}

	async wait_for_element_visible(element) {
		try {
			await this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), this.TIMEOUT);
		} catch(err) {
			console.log(err);
		}
	}

  	async wait_for_element_coordinates_not_change(element, timeout=10, sleep_delay=1) {
  		let count = 0;
  		let offset_top = 0;
  		while (count < timeout) {
  			await this.sleep(sleep_delay * 1000);

  			let new_offset_top = await this.get_element_top_offset(element);
  			if (new_offset_top == offset_top) {
  				break;
  			}
  			offset_top = new_offset_top;
  			count++;
  		}
  	}

	async wait_element_not_found(element, timeout=10, sleep_delay=1) {
		let count = 0;
  		while (count < timeout) {
  			await this.sleep(sleep_delay * 1000);
  			let el_state = await this.is_button_not_found();
  			if (el_state == true) {
  				break;
  			}
  			count++;
  		}
	}

};

module.exports = Page;
