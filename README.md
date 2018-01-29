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
You can use browser to make GET requests or you can use any other web API development tool, such as Postman, to make GET and POST requests.

API has two endpoints.

### GET
```
localhost:3000/api/phonenumbers/parse/text/{TEXT_TO_PARSE}
```
### POST
For POST request ```Content-Type``` header must be ```text/plain``` and ```body``` must contain ```base64``` encoded text file.
```
localhost:3000/api/phonenumbers/parse/file
```


Both endpoints return JSON formatted list of numbers.
