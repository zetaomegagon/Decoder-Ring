# Thinkful Decoder Ring Project

## Contents
1. [About](https://github.com/zetaomegagon/thinkful-decoder-ring#about-this-project)
2. [Overview](https://github.com/zetaomegagon/thinkful-decoder-ring#overview)
	- [Caesar Cipher](https://github.com/zetaomegagon/thinkful-decoder-ring#caesar-cipher)
	- [Polybius Square Cipher](https://github.com/zetaomegagon/thinkful-decoder-ring#polybius-square-cipher)
	- [Subsitution Cipher](https://github.com/zetaomegagon/thinkful-decoder-ring#substitution-cipher)
3. [Screenshots](https://github.com/zetaomegagon/thinkful-decoder-ring#screenshots)
4. [Installation](https://github.com/zetaomegagon/thinkful-decoder-ring#installation)

## About this project

This project showcases an app providing three methods of encrypting / decrypting a message.

The main component of the app are the following ciphers:
1. The `Caesar Cipher`,
2. The `Polybius Square`,
3. and the `Substitution Cipher`.

## Overview
### Caesar Cipher
![Caesar Cipher Graphic](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Caesar_cipher_left_shift_of_3.svg/800px-Caesar_cipher_left_shift_of_3.svg.png)

From [Wikipedia](https://en.wikipedia.org/wiki/Caesar_cipher):

> In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on.
> 
> The method is named after Julius Caesar, who used it in his private correspondence.

#### Functionality
For the purposes of this application, the `caesar()` function takes an *input string*, an *integer value*, and an *optional boolean* value used to initiate an encoding or decoding of the input message. This value defaults to `true`, if no value is passed, indicating that the function should *encode*.

Given a starting poing of `m` on the "alphabet line", if the integer is greater than zero; then the shift moves forward toward `z`. If the integer is less than zero; then the shift is toward `a`.

Encoding and decoding are a matter of taking the inverse of the integer based on the message:
- To *encode*, give a message and a shift
- To *decode*, give the *encoded* message and the inverse of the shift

Of course the function takes care of this with the *encode* parameter argument, which does the inversion, so that we don't have to remeber if our shift was negative or positive in the first place. *You do need to remember the shift value!*

The function preserves punctuation and spaces anywhere in the input string.

##### Examples
```
--encoding--
caesar("abc",1) -> "bcd"
caesar("abc",1,true) -> "bcd"

--decoding--
caesar("bcd",-1) -> "abc"
caesar("bcd",1,false) -> "abc"
```

This function is located at [/src/caesar.js](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/src/caesar.js).

### Polybius Square Cipher
![Polybius Square Coordinate Table](https://1.bp.blogspot.com/-95Fb1cqkZpY/XUhlzx8Mx7I/AAAAAAAAwGs/qzcth0WN9zUNYvIKCE3abIH9S21icPHbACPcBGAYYCw/s1600/Polybius%2BSquare%2BCipher%2BKey.png)

From [Wikipedia](https://en.wikipedia.org/wiki/Polybius_square#Basic_form):

> According to Polybius' Histories, the device was invented by Cleoxenus and Democleitus, and further developed by Polybius himself. The device partitioned the alphabet into five tablets with five letters each (except for the last one with only four). There are no surviving tablets from antiquity. Letters are represented by two numbers from one to five, allowing the representation of 25 characters using only 5 numeric symbols.
> 
> Each letter is then represented by its coordinates in the grid. For example, "BAT" becomes "12 11 44". The 26 letters of the Latin/English alphabet do not fit in a 5 × 5 square, two letters must be combined (usually I and J as above, though C and K is an alternative).

#### Functionality
This implementation of the `polybius()` function takes an *input string*, and an *encode boolean value*. This value defaults to `true` indicating it should encode. The input string will be either letters and punctuation (for encoding), or Polybius number pairs and **sane** punctuation (for decoding).

During encoding, the English alphabet is dynamically mapped to Polybius numbers, forming a dictionary. The dictionary is then used to encode the input via `letter:number` lookup. The opposite is true for decoding.

##### Examples
```
--encoding--
polybius("Ooh, nifty!")-> "434332, 3342124445!"
polybius("Ooh, nifty!",true)-> "434332, 3342124445!"

--decoding--
polybius("434332, 3342124445!",false) --> "ooh, nifty!"
```

This function is located at [src/polybius.js](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/src/polybius.js)

### Substitution Cipher
![ROT13 Substitution Cipher](https://upload.wikimedia.org/wikipedia/commons/2/2a/ROT13.png)

From [Wikipedia](https://en.wikipedia.org/wiki/Substitution_cipher):

>In cryptography, a substitution cipher is a method of encrypting in which units of plaintext are replaced with the ciphertext, in a defined manner, with the help of a key; the "units" may be single letters (the most common), pairs of letters, triplets of letters, mixtures of the above, and so forth. The receiver deciphers the text by performing the inverse substitution process to extract the original message.
>
>Substitution ciphers can be compared with transposition ciphers. In a transposition cipher, the units of the plaintext are rearranged in a different and usually quite complex order, but the units themselves are left unchanged. By contrast, in a substitution cipher, the units of the plaintext are retained in the same sequence in the ciphertext, but the units themselves are altered.
>
>There are a number of different types of substitution cipher. If the cipher operates on single letters, it is termed a simple substitution cipher; a cipher that operates on larger groups of letters is termed polygraphic. A monoalphabetic cipher uses fixed substitution over the entire message, whereas a polyalphabetic cipher uses a number of substitutions at different positions in the message, where a unit from the plaintext is mapped to one of several possibilities in the ciphertext and vice versa.

#### Functionality
This application uses a simple substitution cipher, consisting of the English language alphabet, and a *substitution* alphabet of any 26 *unique* characters. These alphabets are passed to the `substitution()` function, along with an *encode' boolean value* (defauts to `true`, indicating an encode operation). Similar to the `polybius()` function, the `substitution()` function uses the two alphabets to dynamically generate encoding / decoding dictionaries.

For encoding English language alphabet *letters* are mapped to the substitution alphabet *characters*. The opposite is true of decoding.

Since the substitution alphabet can contain any characters, punctuation (excluding spaces) in the input string is not preserved.

##### Examples
```
--encode--
substitution("Zetaomegagon rocks!","qaz!wsx@edc#rfv$tgb^yhn&uj") -> "jw^qvrwxqxvf gvzcb"
substitution("Zetaomegagon rocks!","qaz!wsx@edc#rfv$tgb^yhn&uj",encode) -> "jw^qvrwxqxvf gvzcb"

--decode--
substitution("jw^qvrwxqxvf gvzcb","qaz!wsx@edc#rfv$tgb^yhn&uj",false) -> "zetaomegagon rocks"

```

This function is located at [src/polybius.js](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/src/substitution.js)

## Screenshots
![caesar-cipher-app-image](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/images/caesar-shift-cipher.png)


![polybius-cipher-app-image](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/images/polybius-square-cipher.png)


![substitution-cipher-app-image](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/images/substitution-cipher.png)

## Installation

### Requirements

Installing the library dashboard requires the following to be done:
1. cloning this repository locally.
2. installing `nvm` ([posix](https://github.com/Neilpang/nvm)|[windows](https://duckduckgo.com/?kae=d&kn=1&kak=-1&kaq=-1&kp=-2&kah=wt-wt&k5=1&kw=w&kax=-1&kau=-1&kaj=m&k1=-1&kav=1&ku=1&kao=-1&kap=-1&kk=-1&kl=us-en&kad=us-en&kg=p&kd=-1&kam=osm&q=installing+nvm+on+windows)).
3. using `nvm` to install `node`.

### The install

**Step 1:** once the requirements are met, navigate to the cloned repository folder and run the following, which should pull all necessary `node_modules` needed to run the webserver and run the code / display pages:

    npm install

**Step 2:** if the node modules install completes without error, you can start the webserver like this:

    npm start

This will launch a forground process in your shell wich you can kill with `ctrl-c`, or other means. Your defalt browser will also be opened, displaying the app.
