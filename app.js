const express = require('express');
const bodyParser = require('body-parser');
const phoneParser = require('./util');
const request = require('request');
const htmlToText = require('html-to-text');
const app = express();
app.use(bodyParser.text({ defaultCharset: 'base64', type: 'text/plain' }));
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
const upload = multer({ storage: storage });
const path = require("path");
const tesseractjs = require('tesseract.js');
const Tesseract = tesseractjs.create({
	workerPath: path.join(__dirname, './node_modules/tesseract.js/src/node/worker.js'),
	langPath:   path.join('./eng.traineddata'),
	corePath:   path.join(__dirname, './node_modules/tesseract.js/src/index.js')
});

app.get('/', function(req, res) {
	res.sendFile('index.html', {
		'root': __dirname
	});
});

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

app.post('/api/phonenumbers/parse/image/', upload.single('file'), function (req, res){
	if(!req.file) {
		// No file attached
		res.status(400).end();
	} else {
		var fileType = (req.file.mimetype).split('/');
		if (fileType[0] !== 'image') {
			// Uploaded file is not an image
			res.status(400).end();
		} else {
			Tesseract.recognize(req.file.path)
				.then(function (result) { res.status(200).json(phoneParser.findNumbers(result.text)); })
		}
		// Deleting uploaded file
		fs.unlink(req.file.path, (err, data) => {
			if (err) throw err;
		});
	}
});

app.listen(process.env.PORT || 3000, () => console.log('API is up and running.'));

module.exports = app;