var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var matchType = require('google-libphonenumber').PhoneNumberUtil.MatchType;
var PNF = require('google-libphonenumber').PhoneNumberFormat;
	
//Validates that only unique numbers are added to the list.
function duplicateCheck(newNumber){
	return function(number){
		return phoneUtil.isNumberMatch(number, newNumber) !== matchType.NO_MATCH?false:true;
	}
}

//Converts the letter in a phoneword into its respective number.
function convertToNumber(c){
	var equivalentNumber = "";
	var n2 = RegExp('[a-cA-C]');
	var n3 = RegExp('[d-fD-F]');
	var n4 = RegExp('[g-iG-I]');
	var n5 = RegExp('[j-lJ-L]');
	var n6 = RegExp('[m-oM-O]');
	var n7 = RegExp('[p-sP-S]');
	var n8 = RegExp('[t-vT-V]');
	var n9 = RegExp('[w-zW-Z]');
	
	if (n2.test(c) == true){
		equivalentNumber = 2;
	}else if (n3.test(c) == true){
		equivalentNumber = 3;
	}else if (n4.test(c) == true){
		equivalentNumber = 4;
	}else if (n5.test(c) == true){
		equivalentNumber = 5;
	}else if (n6.test(c) == true){
		equivalentNumber = 6;
	}else if (n7.test(c) == true){
		equivalentNumber = 7;
	}else if (n8.test(c) == true){
		equivalentNumber = 8;
	}else if (n9.test(c) == true){
		equivalentNumber = 9;
	}
	
	return equivalentNumber;
}

//Finds and validates all numbers in the string.
//Parameter: text - string to search in.
//Returns: list of numbers in NATIONAL format.
exports.findNumbers = function findNumbers(text){
	//Possible characters that number can consist of.
	var possibleChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')', '-', '+', '.'];
	var phoneLetters = RegExp('[a-zA-Z]');
	var phoneNumber = "";
	var phoneNumbers = [];
	try{
		
		for(var i=0;i<text.length;i++){
			
			while(i < text.length){
				if(possibleChars.indexOf(text[i]) !== -1){
					phoneNumber += text[i];
					i++;
				}
				else if(phoneNumber.length >= 3 && phoneLetters.test(text[i]) == true){
					phoneNumber += convertToNumber(text[i]);
					i++;
				}
				else{
					break;
				}
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