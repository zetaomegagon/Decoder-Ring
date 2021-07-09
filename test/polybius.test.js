// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe("Polybius Cipher", () => {
    describe("Input Handling", () => {
	it("if input is not passed, return false", () => {
	    const input = null;
	    const actual = polybius(input);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("if input is an empty string, return false", () => {
	    const input = "";
	    const actual = false;
	    const expected = polybius(input);

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});
    });
    
    describe("Encoding / Decoding", () => {
	describe("When encoding, it translates the letters i and j to 42.", () => {
	    it("'i' = '42'", () => {
		const input = "i";
		const actual = polybius(input);
		const expected = "42";

		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });

	    it("'j' = '42'", () => {
		const input = "j";
		const actual = polybius(input);
		const expected = "42";

		expect(actual).to.be.a('string');
		expect(actual).to.be.equal(expected);
	    });

	});
	
	it("When decoding, it translates 42 to (i/j).", () => {
	    const input = "42";
	    const actual = polybius(input,false);
	    const expected = "(i|j)";
	    
	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);
	});
	
	it("Should ignore capital letters when encoding; then decoding.", () => {
	    const input = "Beale, Elijah Thomas";
	    const actual = polybius(polybius(input),false);
	    const expected = "beale, el(i|j)(i|j)ah thomas";

	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);
	});
	describe("Should preserve punctuation and spaces during encoding and decoding.", () => {
	    it("encode", () => {
		const input = "Beale, Elijah Thomas!";
		const actual = polybius(input);
		const expected = "2151111351, 511342421132 443243231134!";

		expect(actual).to.be.a('string');
		expect(actual).to.be.equal(expected);
	    });

	    it("decode", () => {
		const input = "2151111351, 511342421132 443243231134!";
		const actual = polybius(input,false);
		const expected = "beale, el(i|j)(i|j)ah thomas!";

		expect(actual).to.be.a('string');
		expect(actual).to.be.equal(expected);
	    });

	});


	it("If during encoding, input contains any numbers, return false.", () => {
	    const input = "Beale, Elij4h Thomas!";
	    const actual = polybius(input);
	    const expected = false;
	    
	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("If during decoding, input contians any letters, return false.", () => {
	    const input = "2151111E51, 511E424211E2 44E24E2E11E4";
	    const actual = polybius(input,false);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.be.equal(expected);
	});

	it("if during decoding, numbers don't make pairs, return false", () => {
	    const input = "2151111351,3 511342421132 443243231134";
	    const actual = polybius(input,false);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.be.equal(expected);
	});	
    });
});
