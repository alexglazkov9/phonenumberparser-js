const express = require('express');
const bodyParser = require('body-parser');
const phoneParser = require('./util');
const app = express();
app.use(bodyParser.text({ defaultCharset: 'base64', type: 'text/plain' }));

app.get('/', function(req, res) {
	res.sendFile('index.html', {
		"root": __dirname
	});
});

app.get('/api/phonenumbers/parse/text/:simpleText', function(req, res){
	var text = req.params.simpleText;
	res.status(200).json(phoneParser.findNumbers(text));
});

app.post('/api/phonenumbers/parse/file/', function(req, res){
	var text = Buffer.from(req.body, 'base64').toString();
	res.status(200).json(phoneParser.findNumbers(text));
});

app.listen(process.env.PORT || 3000, () => console.log('API is up and running.'));

module.exports = app;