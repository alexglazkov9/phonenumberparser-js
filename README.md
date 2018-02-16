# phonenumberparser-js
RESTful API based on google's libphonenumber library.
***
## How to set up
Clone repository:
```
git clone https://github.com/alexglazkov9/phonenumberparser-js.git
```
Ensure that Node.js is installed on your system.
Install all dependencies with the following command:
```
npm install
```
To run server use the following command:
```
npm run dev
```
To run tests use the following command:
```
npm test
```
***
## How to use
You can use browser to make GET requests or you can use any web API development tool, such as Postman, to make GET and POST requests.

API has three endpoints.

### GET
```
localhost:3000/api/phonenumbers/parse/text/{TEXT_TO_PARSE}
```

```
localhost:3000/api/phonenumbers/url/{RESOURCE_AT_GIVEN_URL}
```
Example of parsing a resource at a given URL:
```
localhost:3000/api/phonenumbers/url/http%3A%2F%2Fexample.com%2F
```

### POST
For POST request ```Content-Type``` header must be ```text/plain``` and ```body``` must contain ```base64``` encoded text file.
```
localhost:3000/api/phonenumbers/parse/file
```

All endpoints return JSON formatted list of numbers.

***

## Heroku
The website is up on [Heroku](https://murmuring-lake-42639.herokuapp.com)

Please see this link on the official [Heroku guide](https://devcenter.heroku.com/articles/deploying-nodejs) to deploy it yourself.
