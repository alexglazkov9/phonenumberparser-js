const express = require('express');
const bodyParser = require('body-parser');
const phoneParser = require('./util');
const request = require('request');
const htmlToText = require('html-to-text');
const app = express();
app.use(bodyParser.text({ defaultCharset: 'base64', type: 'text/plain' }));



app.get('/api/phonenumbers/parse/text/:simpleText', function(req, res){
	var text = req.params.simpleText;
	res.status(200).json(phoneParser.findNumbers(text));
});

app.get('/api/phonenumbers/url/:urlString', function(req, res){
	request(req.params.urlString, function (error, response, body) {
		if (error) {
			// Print the error if one occurred
			console.log('error:', error);
			res.status(404).end();
		} else if (response.statusCode !== 200) {
			// Print the response status code if a bad response was received
			console.log('statusCode:', response && response.statusCode);
			res.status(404).end();
		} else {
			// html-to-text converter
			var textFromHtml = htmlToText.fromString(body, {
				wordwrap: 100
			});
			// Replacing unwanted tabs, form feeds, line feeds with single space
			textFromHtml = textFromHtml.replace(/\s+/g, " ");
			res.status(200).json(phoneParser.findNumbers(textFromHtml));
		}
	});
});

app.post('/api/phonenumbers/parse/file/', function(req, res){
	var text = Buffer.from(req.body, 'base64').toString();
	res.status(200).json(phoneParser.findNumbers(text));
});

app.listen(3000, () => console.log('API is up and running.'));

module.exports = app;