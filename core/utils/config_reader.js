
var fs=require('fs');
var data=fs.readFileSync('./config.json', 'utf8');
var words=JSON.parse(data);

var get_url = function() {
	return words['base_url'];
}

var get_timeout =  function() {
	return words['test_timeout'];	
}

var get_browser  =  function() {
	return words['browser'];	
}

module.exports.get_url = get_url;
module.exports.get_timeout = get_timeout;
module.exports.get_browser = get_browser;
