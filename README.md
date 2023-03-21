![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_id_nanoid)
![David](https://img.shields.io/david/thzero/library_id_nanoid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_id_nanoid

This library uses the https://github.com/ai/nanoid package to generate long ids (21 length) and short (16 length) ids based on https://github.com/ai/nanoid with the default character set.

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 18+

## Installation

[![NPM](https://nodei.co/npm/@thzero/library_id_nanoid.png?compact=true)](https://npmjs.org/package/@thzero/library_id_nanoid)

## Options

The following options can be set.

* Utility.setIdGeneratorAlphabet - sets a custom alphabet for nanoid use, be sure to read https://zelark.github.io/nano-id-cc.
* Utility.setIdGeneratorLengthLong - sets the length of the long id generation, be sure to read https://zelark.github.io/nano-id-cc.
* Utility.setIdGeneratorLengthShort - sets the length of the short id generation, be sure to read https://zelark.github.io/nano-id-cc.
