# Thinkful Local Library Project

## Contents
1. [About](https://github.com/zetaomegagon/thinkful-decoder-ring#about-this-project)
2. [Overview](https://github.com/zetaomegagon/thinkful-decoder-ring#overview)
3. [Screenshots](https://github.com/zetaomegagon/thinkful-decoder-ring#screenshots)
4. [Installation](https://github.com/zetaomegagon/thinkful-decoder-ring#installation)

## About this project

This project showcases an app providing three methods of {en,de}crypting a message.

## Overview

The main componenet of the app are the following ciphers:
1. The `Ceasar Cipher`,
2. The `Polybius Square`,
3. and the `Substitution Cipher`.

### Ceasar Cipher
![Ceasar Cipher Graphic](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Caesar_cipher_left_shift_of_3.svg/800px-Caesar_cipher_left_shift_of_3.svg.png)

From [Wikipedia](https://en.wikipedia.org/wiki/Caesar_cipher):

> In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on.
> 
> The method is named after Julius Caesar, who used it in his private correspondence.

#### Functionality
For the purposes of this application, the `ceasar()` function takes an *input string*, an *integer value*, and an *optional boolean* value used to initiate an encoding or decoding of the input message. This value defaults to `true`, if no value is passed, indicating that the function should *encode*.

Given a starting poing of `m` on the "alphabet line", if the integer is greater than zero; then the shift moves forward toward `z`. If the integer is less than zero; then the shift is toward `a`.

Encoding and decoding are a matter of taking the inverse of the integer based on the message:
- To *encode*, give a message and a shift
- To *decode*, give the *encoded* message and the inverse of the shift

Of course the our function takes care of this with the *encode* parameter argument, so that we don't have to remeber if our shift was negative or positive in the first place. *You do need to remember the shift value!*

Examples:
```
--encoding--
ceasar("abc",1) -> "bcd"
ceasar("abc",1,true) -> "bcd"

--decoding--
caesar("bcd",-1) -> "abc"
caesar("bcd",1,false) -> "abc"
```

This function is located at [/src/ceasar.js](https://github.com/zetaomegagon/thinkful-decoder-ring/blob/main/src/caesar.js).

### Polybius Square
![Polybius Square Coordinate Table](https://1.bp.blogspot.com/-95Fb1cqkZpY/XUhlzx8Mx7I/AAAAAAAAwGs/qzcth0WN9zUNYvIKCE3abIH9S21icPHbACPcBGAYYCw/s1600/Polybius%2BSquare%2BCipher%2BKey.png)

From [Wikipedia](https://en.wikipedia.org/wiki/Polybius_square#Basic_form):

> According to Polybius' Histories, the device was invented by Cleoxenus and Democleitus, and further developed by Polybius himself. The device partitioned the alphabet into five tablets with five letters each (except for the last one with only four). There are no surviving tablets from antiquity. Letters are represented by two numbers from one to five, allowing the representation of 25 characters using only 5 numeric symbols.
> 
> Each letter is then represented by its coordinates in the grid. For example, "BAT" becomes "12 11 44". The 26 letters of the Latin/English alphabet do not fit in a 5 × 5 square, two letters must be combined (usually I and J as above, though C and K is an alternative).
#### Functionality
In this application the the `polybius()` function takes an input 
### Substitution Cipher
#### Functionality
## Screenshots

## Installation

### Requirements

Installing the library dashboard requires the following to be done:
1. cloning this repository locally.
2. installing `nvm` ([posix](https://github.com/Neilpang/nvm) | [windows](https://duckduckgo.com/?kae=d&kn=1&kak=-1&kaq=-1&kp=-2&kah=wt-wt&k5=1&kw=w&kax=-1&kau=-1&kaj=m&k1=-1&kav=1&ku=1&kao=-1&kap=-1&kk=-1&kl=us-en&kad=us-en&kg=p&kd=-1&kam=osm&q=installing+nvm+on+windows)).
3. using `nvm` to install `node`.

### The install

**Step 1:** once the requirements are met, navigate to the cloned repository folder and run the following, which should pull all necessary `node_modules` needed to run the webserver and run the code / display pages:

    npm install

**Step 2:** if the node modules install completes without error, you can start the webserver like this:

    npm start

This will launch a forground process in your shell wich you can kill with `ctrl-c`, or other means. Your defalt browser will also be opened, displaying the app.
