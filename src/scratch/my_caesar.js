    function _mod(number,modBy) {
	// modulus function that accounts for a
	// negative number values returning a
	// number within the range of our
	// alphabet
	return (number % modBy + modBy) % modBy;
    }

    function _encodeDecodeMessage(messageArray,alphabetArray,shift,encode) {
	// encode or decode a messageArray based on value of 'encode'
	// returns a message string
	const encodeDecodeMessage = messageArray.map((char) => {
	    const inAlphabet = alphabetArray.includes(char);
	    
	    if (inAlphabet) {
		const length = alphabetArray.length;
		const index = alphabetArray.indexOf(char);

		const _encode = alphabetArray[_mod(index + shift, length)];
		const _decode = alphabetArray[_mod(index + (shift * -1), length)];

		return encode
		    ? _encode
		    : _decode
	    }
	    
	    return char;
	}).join("");

	return encodeDecodeMessage;
    }

    function caesar(input, shift, encode = true) {
	// define our alphabet array
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

	// check for input and shift validitiy
	const isValid = !input
	      || input === ""
	      || !shift
	      || shift === 0
	      || shift > 25
	      || shift < -25
	      || typeof parseInt(input) === 'number'
	
	if (isValid) return !isValid;
	
	// lowercase our message, and transform
	// it to an array of characters
	let messageToLower = input.toLowerCase();
	let messageArray = Array.from(messageToLower);

	return _encodeDecodeMessage(messageArray,alphabet,shift,encode);
    }

const message = "A";
const shift = 1;
const test = caesar(message, shift);
console.log(test);

const message1 = "def, ghi, jkl";
const shift1 = -3;
const test1 = caesar(message1, shift1, false);
console.log(test1)
