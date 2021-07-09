// Write your tests here!
const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe("Substitution Cipher", () => {
    // Input value handling
    describe("Input Value Handling", () => {
	it("Returns false if the input argument doesn't exist.", () => {
	    const input = null;
	    const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
	    const actual = substitution(input,alphabet)
	    const expected = false;
	    
	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the input argument is an empty string.", () => {
	    const input = "";
	    const alphabet = null;
	    const actual = substitution(input,alphabet);
	    const expected = false;
	    
	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});
    });
    // Alphabet value handling
    describe("Alphabet Value Handling", () => {
	it("Returns false if the alphabet argument doesn't exist.", () => {
	    const input = "Elijah Beale";
	    const alphabet = null;
	    const actual = substitution(input,alphabet);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the given alphabet is empty.", () => {
	    const input = "Elijah Beale";
	    const alphabet = "";
	    const actual = substitution(input,alphabet);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the given alphabet is less than 26 characters long.", () => {
	    const input = "Elijah Beale";
	    const alphabet = "po@uytr%wqlk";
	    const actual = substitution(input,alphabet);
	    const expected = false;

	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if the given alphabet is greater than 26 characters long.", () => {
	    const input = "Elijah Beale";
	    const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz*";
	    const actual = substitution(input,alphabet);
	    const expected = false;
	    
	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});

	it("Returns false if there are any duplicate characters in the given alphabet.", () => {
	    const input = "message";
	    const alphabet = "po@uytr%wqlkjhgfdsa@nbvcxz";
	    const actual = substitution(input,alphabet);
	    const expected = false;
	    
	    expect(actual).to.be.false;
	    expect(actual).to.eql(expected);
	});
    });
    // Encoding / Decoding
    describe("Encoding / Decoding", () => {
	describe("Correctly encodes and decodes the given phrase, using the passed alphabet argument.", () => {
	    it("encoding", () => {
		const input = "Elijah Beale";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet);
		const expected = "ykwqp% oypky";
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });

	    it("decoding", () => {
		const input = "ykwqp% oypky";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet,false);
		const expected = "elijah beale";

		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });
	});

	describe("Maintains spaces in the message, before and after encoding or decoding.", () => {
	    it("encoding", () => {
		const input = "El ij ah Be ale";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet);
		const expected = "yk wq p% oy pky";
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });

	    it("decoding", () => {
		const input = "yk wq p% oy pky";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet,false);
		const expected = "el ij ah be ale";
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });
	});

	describe("Ignores capital letters, before and after encoding or decoding.", () => {
	    it("encoding", () => {
		const input = "ElIjaH BeAlE";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet);
		const expected = "ykwqp% oypky"
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });

	    it("decoding", () => {
		const input = "YKWQP% OYPKY";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet,false);
		const expected = "elijah beale";
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });

	});

	describe("Correctly encodes and decodes using an alphabet that contains any characters.", () => {
	    it("encoding", () => {
		const input = "Elijah Beale";

		const alphabets = [
		    "po!uytr$wqlkjhgfdsa^nbvcxz",
		    "po@uytr%wqlkjhgfdsa&nbvcxz",
		    "po#uytr^wqlkjhgfdsa*nbvcxz"
		];
		
		const actual1 = substitution(input,alphabets[0])
		const actual2 = substitution(input,alphabets[1])
		const actual3 = substitution(input,alphabets[2])

		const expected = [
		    "ykwqp$ oypky",
		    "ykwqp% oypky",
		    "ykwqp^ oypky"
		]

		expect(actual1).to.be.a('string');
		expect(actual1).to.equal(expected[0]);

		expect(actual2).to.be.a('string');
		expect(actual2).to.equal(expected[1]);
		
		expect(actual3).to.be.a('string');
		expect(actual3).to.equal(expected[2]);		   
	    });

	    it("decoding", () => {
		const inputs = [
		    "ykwqp$ oypky",
		    "ykwqp% oypky",
		    "ykwqp^ oypky"
		];

		const alphabets = [
		    "po!uytr$wqlkjhgfdsa^nbvcxz",
		    "po@uytr%wqlkjhgfdsa&nbvcxz",
		    "po#uytr^wqlkjhgfdsa*nbvcxz"
		];
		
		const actual1 = substitution(inputs[0],alphabets[0],false)
		const actual2 = substitution(inputs[1],alphabets[1],false)
		const actual3 = substitution(inputs[2],alphabets[2],false)

		const expected = "elijah beale";
		
		expect(actual1).to.be.a('string');
		expect(actual1).to.equal(expected);

		expect(actual2).to.be.a('string');
		expect(actual2).to.equal(expected);
		
		expect(actual3).to.be.a('string');
		expect(actual3).to.equal(expected);		   
	    });
	});

	describe("Does not preserve puncutation other than spaces during encoding or decoding", () => {
	    it("encoding", () => {
		const input = "Be@a4le, El^ij&ah Th(om)as!";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet);
		const expected = "oypky ykwqp% &%gjpa";
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });

	    it("encoding", () => {
		const input = "oypky ykwqp% &%gjpa";
		const alphabet = "po@uytr%wqlkjhgfdsa&nbvcxz";
		const actual = substitution(input,alphabet,false);
		const expected = "beale elijah thomas";
		
		expect(actual).to.be.a('string');
		expect(actual).to.equal(expected);
	    });
	});
    });
});

