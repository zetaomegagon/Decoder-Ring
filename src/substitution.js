// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
    function _substitutionCharUnique(substitutionArray) {
	// determines if each character in the substitution
	// alphabet is unique
	return substitutionArray.filter((char,index,array) => {
	    const rest = array.slice(index + 1);
	    const inRest = rest.includes(char);

	    if (inRest) return char;
	    
	}).length === 0;
    }

    function _mapLettersOrNumbers(alphabetArray,substitutionArray,character,encode) {
	// maps letters -> numbers , or vice versa, in an object.
	// this creates a letter:number or number:letter dictionary
	// used for encoding and decoding
	//
	// uses an internal helper function which reverses two array args
	// depending on the value of 'encode'
	function __mapCharToChar(alphabetOrSubArray1,alphabetOrSubArray2) {
	    return alphabetOrSubArray1.reduce((obj,char,index) => {
		obj[char] = alphabetOrSubArray2[index];
		return obj;
	    },{});
	}
	
	const alphaToSub = __mapCharToChar(alphabetArray,substitutionArray);
	const subToAlpha = __mapCharToChar(substitutionArray,alphabetArray);

	return encode
	    ? alphaToSub[character]
	    : subToAlpha[character]
    }

    function _encodeDecodeMessage(messageArray,alphabetArray,substitutionArray,encode) {
	// encodes / decodes based on 'encode' value using character dictionaries
	// to translate forward and backward substitution
	return messageArray.map((char) => {
	    const isNotSpace = char !== " ";
	    // this works because _mapLettersOrNumber() swaps the two arrays based on
	    // the 'encode' value
	    const lookupChar = _mapLettersOrNumbers(alphabetArray,substitutionArray,char,encode)

	    return isNotSpace
		? lookupChar
		: char
	    
	}).join("");
    }

    function substitution(input, alphabet, encode = true) {
	// check validitiy of inpu and alphabet
	// if either doesn't exist; or is an empty string
	// return false
	const isValid = !input || input === "" || !alphabet;

	if (isValid) return !isValid;

	// define arrays
	const messageArray = input.toLowerCase().split("");
	const substitutionArray = alphabet.toLowerCase().split("");
	const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");

	// tests
	//
	// - is the substitution alphabet as long as
	//   our romance language alphabet?
	//
	// - is every character in our substitution
	//   alphabet unique?
	//
	// - should we continue or return false based
	//   on the above? (t/t)
	const isCorrectLength = substitutionArray.length === alphabetArray.length;
	const isSubCharUnique = _substitutionCharUnique(substitutionArray);
	const shouldContinue = isCorrectLength && isSubCharUnique;

	if (!shouldContinue) return shouldContinue;

	// encode or decode a message based on the state
	// of encode
	return _encodeDecodeMessage(messageArray,alphabetArray,substitutionArray,encode)

    }
    return {
	substitution,
    };
})();

module.exports = { substitution: substitutionModule.substitution };
