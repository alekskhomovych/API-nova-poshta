
var fs=require('fs');
var data=fs.readFileSync('./data/data.json', 'utf8');
var words=JSON.parse(data);

var get_login = function() {
	return words['login'];	
}

var get_password = function() {
	return words['password'];	
}

var get_city_sender = function() {
	return words['city_sender'];
}

var get_template_name = function() {
	return words['template_name'];
}

module.exports.get_login = get_login;
module.exports.get_password = get_password;
module.exports.get_city_sender = get_city_sender;
module.exports.get_template_name = get_template_name;
