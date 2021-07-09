// Write your tests here!
const { expect } = require("chai");
const { caesar } = require("../src/caesar");

describe("Caesar Cipher", () => {
    
    describe("Shift Value Handling", () => {
	it("Returns false if the shift value isn't present.", () => {
	    const input = "thinkful";
	    const shift = null;
	    const actual = caesar(input,shift);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the shift value is equal to 0.", () => {
	    const input = "thinkful";
	    const shift = 0;
	    const actual = caesar(input,shift);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the shift value is less than -25.", () => {
	    const input = "thinkful";
	    const shift = -26;
	    const actual = caesar(input,shift);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the shift value is greater than 25.", () => {
	    const input = "thinkful";
	    const shift = 26;
	    const actual = caesar(input,shift);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});
    });
    
    describe("Input Value Handling", () => {
	it("Returns false if the input value isn't present.", () => {
	    const input = null;
	    const shift = 1
	    const actual = caesar(input,shift);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the input value is an empty string.", () => {
	    const input = "";
	    const shift = 1;
	    const actual = caesar(input,shift);
	    const expected = false;

	    expect(actual).to.be.false;
	});
    });
    
    describe("Character Handling", () => {
	it("Ignores capital letters during encoding.", () => {
	    const input = "ABCDEFG";
	    const shift = 1;
	    const actual = caesar(input,shift);
	    const expected = "bcdefgh";

	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);
	});

	it("Ignores capital letters during decoding.", () => {
	    const input = "BCDEFGH";
	    const shift = 1;
	    const actual = caesar(input,shift,false);
	    const expected = "abcdefg";

	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);
	});

	it("Ignores spaces and punctuation during encoding.", () => {
	    const input = "Hello, World!";
	    const shift = 1;
	    const actual = caesar(input,shift);
	    const expected = "ifmmp, xpsme!";

	    expect(actual).to.be.equal(expected);	
	});

	it("Ignores spaces and punctuation during decoding.", () => {
	    const input = "ifmmp, xpsme!";
	    const shift = 1;
	    const actual = caesar(input,shift,false);
	    const expected = "hello, world!";

	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);	
	});
	
	it("Should correctly handle characters at the beginning of the alphabet.", () => {
	    const input = "abc";
	    const shift = -25;
	    const actual = caesar(input,shift);
	    const expected = "bcd";
	    
	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);	
	});

	it("Should correctly handle characters at the end of the alphabet.", () => {
	    const input = "xyz";
	    const shift = 25;
	    const actual = caesar(input,shift);
	    const expected = "wxy";
	    
	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);	
	});
    });
    
    describe("Shift Movement", () => {
	it("Should handle shifts that go past the end of the alphabet forward.", () => {
	    const input = "xyz";
	    const shift = 25;
	    const actual = caesar(input,shift);
	    const expected = "wxy";
	    
	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);	
	});

	it("Should handle shifts that go past the end of the alphabet backward.", () => {
	    const input = "abc";
	    const shift = -25;
	    const actual = caesar(input,shift);
	    const expected = "bcd";
	    
	    expect(actual).to.be.a('string');
	    expect(actual).to.be.equal(expected);	
	});
    });
});

