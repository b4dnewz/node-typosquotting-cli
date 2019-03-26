# typosquotter-cli

> Generate typosquotted domain names from the command line

This package provide the command line utility for [typosquotter](https://github.com/b4dnewz/node-typosquotting) module.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Project License][license-image]][license-url]

## Installation

First of all you have to install it as a global module:

```
$ npm install -g typosquotter-cli
```

Than you will have access to the command from your terminal:

```
$ typosquotter --help
```

You can also use __npx__ if you want to test it out or quickly use it without having to install it:

```
$ npx typosquotter-cli --help
```

## Usage

The simplest usage it's to pass in a domain name and it will print out the typosquotted domain grouped by technique name:

```
$ typosquotter youtube.com

repetition: [
  'yyoutube.com',
  'yooutube.com',
  'youutube.com',
  'youttube.com',
  'youtuube.com',
  'youtubbe.com',
  'youtubee.com'
],
subdomain: [
  'y.outube.com',
  'yo.utube.com',
  'you.tube.com',
  'yout.ube.com',
  'youtu.be.com',
  'youtub.e.com'
],
switching: [
  'oyutube.com',
  'yuotube.com',
  'yotuube.com',
  'youutbe.com',
  'youtbue.com',
  'youtueb.com'
],
tld: [
  'youtube.ac',
  'youtube.ad',
  'youtube.ae',
  ...
```

You can also save the result to a file in your system:

```
$ typosquotter youtube.com --write
```

The cli it's built with [clito](https://github.com/b4dnewz/clito) that has built-in usage help, so type `--help` to know how it works in details and to see all the possible options.


---

## License

This package is under [MIT](LICENSE) license © [b4dnewz](https://b4dnewz.github.io/)

[npm-image]: https://badge.fury.io/js/typosquotter-cli.svg

[npm-url]: https://npmjs.org/package/typosquotter-cli

[travis-image]: https://travis-ci.org/b4dnewz/node-typosquotting-cli.svg?branch=master

[travis-url]: https://travis-ci.org/b4dnewz/node-typosquotting-cli

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg

[license-url]: https://github.com/b4dnewz/node-typosquotting-cli/blob/master/LICENSE
