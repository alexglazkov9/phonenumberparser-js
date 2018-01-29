var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var matchType = require('google-libphonenumber').PhoneNumberUtil.MatchType;
var PNF = require('google-libphonenumber').PhoneNumberFormat;
	
//Validates that only unique numbers are added to the list.
function duplicateCheck(newNumber){
	return function(number){
		return phoneUtil.isNumberMatch(number, newNumber) !== matchType.NO_MATCH?false:true;
	}
}

//Finds and validates all numbers in the string.
//Parameter: text - string to search in.
//Returns: list of numbers in NATIONAL format.
exports.findNumbers = function findNumbers(text){
	//Possible characters that number can consist of.
	var possibleChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')', '-', '+', ' ', '.'];
	var phoneNumber = "";
	var phoneNumbers = [];
	try{
		for(var i=0;i<text.length;i++){
			
			while(i < text.length & possibleChars.indexOf(text[i]) !== -1){
				phoneNumber += text[i];
				i++;
			}
	
			if(phoneNumber.length > 7 & phoneNumber.length < 17){
				
				var number = phoneUtil.parse(phoneNumber, phoneNumber.indexOf('+') === -1?'CA':'');
				
				if(phoneUtil.isValidNumber(number)){
					
					if(phoneNumbers.every(duplicateCheck(number))){
						phoneNumbers.push(phoneUtil.format(number, PNF.NATIONAL));
					}
				}
			}
			phoneNumber = "";
		}
	}catch(err){
		console.log(err);
	}
	return phoneNumbers;
}