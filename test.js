var expect = require('chai').expect;
var chai = require('chai');
var fs = require('fs');
chai.use(require('chai-http'));
const app = require('./app');

describe('API endpoint /api/phonenumbers/parse/text/', function(){
	
	it('Returns an empty list', function(){
		return chai.request(app)
			.get('/api/phonenumbers/parse/text/test')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.be.empty;
			});
	});
	
	it('Returns (416) 491-5050', function(){
		return chai.request(app)
			.get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.include("(416) 491-5050");
			});
	});
	
	it('Returns (416) 491-5050 and (416) 491-8811', function(){
		return chai.request(app)
			.get('/api/phonenumbers/parse/text/Seneca%20Phone416.491.8811%20Number%3A%20416-491-5050')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.include("(416) 491-5050").include("(416) 491-8811");
			});
	});
	
});

describe('API endpoint /api/phonenumbers/url/', function(){
	
	it('Parsing www.google.com. Returns an empty list', function(){
		return chai.request(app)
			.get('/api/phonenumbers/url/http%3A%2F%2Fgoogle.com%2F')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.be.empty;
			});
	});

	it('Parsing www.senecacollege.ca/contact. Returns (416) 491-5050, (416) 491-8811, (905) 833-1650', function(){
		return chai.request(app)
			.get('/api/phonenumbers/url/http%3A%2F%2Fsenecacollege.ca%2Fcontact%2F')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.include("(416) 491-5050",
											"(416) 491-8811",
											"(905) 833-1650");
			});
	});
	
});

describe('API endpoint /api/phonenumbers/parse/file/', function(){
	
	it('Returns an empty list', function(){
		return chai.request(app)
			.post('/api/phonenumbers/parse/file')
			.set('Content-Type', 'text/plain;charset=base64')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.be.empty;
			});
	});
	
	it('Parsing Seneca\'s "Contact Us" web page. Returns (416) 491-5050, (416) 491-8811, (905) 833-1650', function(){
		return chai.request(app)
			.post('/api/phonenumbers/parse/file')
			.set('Content-Type', 'text/plain;charset=base64')
			.send(fs.readFileSync('./test_input.txt'))
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res.body).to.include("(416) 491-5050",
											"(416) 491-8811",
											"(905) 833-1650");
			});
	});
	
});