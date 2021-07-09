function _arePairedNumbers(encodedMessageArray, numberArray, encode) {
    // checks if an encoded message passed as input has an even number of
    // number characters
    if (!encode) {
	const isNumber = encodedMessageArray.filter((char) => !numberArray.includes(char));
	const arePairs = (encodedMessageArray.length - isNumber.length) % 2 === 0;

	return arePairs;
    }

    return encode;
}

function _areCharsOfOneType(messageArray, alphabetArray, numberArray, encode) {
    // determines if an input message is of:
    //
    // - letter characters if we are encoding
    // - number characters if we are decoding
    //
    // the check is based on the value of encode
    // we don't care about punctuationa
    function __checkString(massageArray,alphaOrNumberArray1,alphaOrNumberArray2) {
	return !messageArray.filter((char) => !alphaOrNumberArray1.includes(char))
	    .some((char) => alphaOrNumberArray2.includes(char));
    }
    const inAlpabetOnly = __checkString(messageArray,alphabetArray,numberArray);
    const inNumbersOnly = __checkString(messageArray,numberArray,alphabetArray);
    
    return encode
	? inAlpabetOnly
	: inNumbersOnly
}

function _parseNumbersToNumberPairs(encodedMessageArray, numberArray, encode) {
    // given a message to be decoded, parse the number elements
    // as polybius number pairs 
    let acc = [];
    const message = encodedMessageArray;
    const length = message.length;
    
    for (let i = 0; i < length; i += 2) {
	let char = message[i];
	const nextChar = message[i + 1];
	const charInNumbers = numberArray.includes(char);
	const nextCharInNumbers = numberArray.includes(nextChar);
	const bothInNumbers = charInNumbers && nextCharInNumbers;
	
	if (!charInNumbers) {
	    acc.push(char);
	    i -= 1;
	}
	
	if (bothInNumbers) {
	    char = char + nextChar;	    
	    acc.push(char);
	}
    }
    
    return acc;    
}

function _genPolybiusNumbers(numbersArray, byRow = true) {
    // generate our polybius number pairs using an array of
    // numbers 0 - 9. We can switch between 'row:col' (true) perspective
    // or 'col:row' (false) perspective by passing a boolean param
    function __genPolyLoop(acc,number,array,bool) {
	const length = array.length / 2;
	
	for (let i = 1; i <= length; i++) {
	    const byRowNum = number * 10 + i;
	    const byColNum = i * 10 + Number(number);

	    bool ? calc = byRowNum : calc = byColNum
	    
	    if (number != 0 && number <= length) {
		acc.push(calc);
	    }
	}
	
	return acc;
    }
    
    return numbersArray.reduce((acc,number,index,array) => {
	return __genPolyLoop(acc,number,array,byRow)
    },[]);
}

function _mapLettersOrNumbers(alphabetArray,numbersArray,character,encode) {
    // maps letters -> numbers , or vice versa, in an object.
    // this creates a letter:number or number:letter dictionary
    // used for encoding and decoding
    //
    // uses an internal helper function which reverses two array args
    // depending on the value of 'encode'
    function __mapCharToChar(alphabetOrPolyArray1,alphabetOrPolyArray2) {
	return alphabetOrPolyArray1.reduce((obj,char,index) => {
	    obj[char] = alphabetOrPolyArray2[index];
	    return obj;
	},{});
    }
    
    const alphaToNumber = __mapCharToChar(alphabetArray,numbersArray);
    const numberToAlpha = __mapCharToChar(numbersArray,alphabetArray);

    return encode
	? alphaToNumber[character]
	: numberToAlpha[character]
}

function _encodeDecodeMessage(messageArray,alphabetArray,polyNumArray,encode) {
    // encodes or decodes a message based on the 'encode' argument state
    const encodeDecode = messageArray.map((char) => {
	if (char === 'i' || char === 'j') char = '(i|j)';

	// check if the current character is in the pertinent array. Used to
	// determine if we lookup the character in our dictionary, and return
	// the value; or just return the character as is.
	const inArray = encode
	      ? alphabetArray.includes(char)
	      : polyNumArray.includes(Number(char))

	// this works because our _mapLettersOrNumbers() function switches array arguments
	// based on the state of 'encode'
	const mapCharToChar = _mapLettersOrNumbers(alphabetArray,polyNumArray,char,encode)
	
	return inArray
	    ? mapCharToChar
	    : char
    }).join("");

    return encodeDecode;
}


function polybius(input, encode = true) {
    // if input arg isn't passed, or is an empty string; return false
    const inputExists = input === undefined || input === "";
    if (inputExists) return !inputExists;
    
    // define our arrays:
    const alphabet = "a b c d e f g h (i|j) k l m n o p q r s t u v w x y z".split(" ");
    const numbers = "1234567890".split("");
    const byRow = false;
    const polybiusNumbers = _genPolybiusNumbers(numbers, byRow);
    const inputToArray = input.toLowerCase().split("");
    
    // Test for:
    //
    // - string made up of either all letters, or all numbers, excluding punctuation
    //   and depending on state of 'encode' (ie 'encode = true', should be all letters
    //   excluding punctuation.)
    //
    // - string of all numbers: is there an even amount of numbers
    //
    // Return 'false' for any failing test
    const areCorrectType = _areCharsOfOneType(inputToArray, alphabet, numbers, encode);
    const arePairs = _arePairedNumbers(inputToArray, numbers, encode);
    const shouldContinue = areCorrectType && arePairs;
    
    if (!shouldContinue) return shouldContinue;
    
    // if decoding transfrom a list of single digit numbers to polybius number
    // pairs based on our input
    const messageArray = encode	? inputToArray : _parseNumbersToNumberPairs(inputToArray, numbers)

    return _encodeDecodeMessage(messageArray,alphabet,polybiusNumbers,encode);    
}

const inputEncodeByRow = "Beale, Elijah Thomas!";
const inputDecodeByRow = "2151111351, 511342421132 443243231134";
const inputEncodeByRowBad = "Beale, Elij4h Thomas!";
const inputDecodeByRowBad = "2151111351,3 511342421132 443243231134";

const test1 = polybius(inputEncodeByRow); 
const test2 = polybius(inputDecodeByRow, false);
const test3 = polybius(inputEncodeByRowBad);
const test4 = polybius(inputDecodeByRowBad, false); 
const test5 = polybius();
const test6 = polybius("",false);

console.log(`Encode Test -- Encode an Ideal string\nMessage: ${inputEncodeByRow}\nResult: ${test1}\n`);
console.log(`Decode Test -- Decode an Ideal string\nMessage: ${inputDecodeByRow}\nResult: ${test2}\n`);
console.log(`Encode Bad Test -- Attempt to encode mixed letters and numbers\nMessage: ${inputEncodeByRowBad}\nResult: ${test3}\n`);
console.log(`Decode Bad Test -- Attempt to decode non-paired numbers\nMessage: ${inputDecodeByRowBad}\nResult: ${test4}\n`);
console.log(`Empty Input Encode Test -- Attempt to encode with input arg\nResult: ${test5}\n`);
console.log(`Empty Input Decode Test -- Attempt to decode with input arg as an empty string\nResult: ${test6}`);
