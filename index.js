#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const {inspect} = require('util');
const clito = require('clito');
const typosquotter = require('typosquotter');
const indent = require('indent-string');

console.log(`
  +-+-+-+-+-+-+-+-+-+-+-+-+
  |t|y|p|o|s|q|u|o|t|t|e|r|
  +-+-+-+-+-+-+-+-+-+-+-+-+
`);

const cli = clito({
  name: 'typosquotter',
  flags: {
    only: {
      type: 'string',
      alias: 'o',
      multiple: true,
      default: false,
      description: 'Run only the selected techniques'
    },
    exclude: {
      type: 'string',
      alias: 'e',
      multiple: true,
      default: false,
      description: 'Exclude the selected techniques'
    },
    flat: {
      type: 'boolean',
      alias: 'f',
      default: false,
      description: 'Return a flat array'
    },
    write: {
      type: 'string',
      alias: 'w',
      description: 'Writes result to file'
    },
    type: {
      type: 'string',
      alias: 't',
      default: 'json',
      description: 'Changes output format [text/json]'
    },
    list: {
      type: 'boolean',
      default: false,
      description: 'Prints the available techniques list'
    }
  },
  examples: [
    '$ typosquotter amazon.com',
    '$ typosquotter -f -w -t text amazon.com',
    '$ typosquotter -o vowelswap amazon.com'
  ]
});

if (cli.flags.list) {
  const techniquesStr = typosquotter.techniques.map(m => '  - ' + m).join('\n');
  const out = ['Available techniques:', techniquesStr, ''].join('\n');
  console.log(indent(out, 2));
  process.exit();
}

// Call typosquotter and get results
const result = typosquotter(cli.input[0], cli.flags);

// If write is falsy print to sdout
if (typeof cli.flags.write === 'undefined') {
  console.log(inspect(result, {
    depth: null
  }));
  return;
}

const fileName = cli.flags.write !== ''
  ? cli.flags.write
  : cli.input[0].toLowerCase();
const filePath = path.resolve(process.cwd(), fileName);

const cbk = err => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Output saved to', filePath);
};

// Support for multiple output types
switch (cli.flags.type) {
  case 'text': {
    const res = Array.prototype.concat(
      ...(Array.isArray(result) ? result : Object.values(result))
    );
    const output = res.join('\n');
    fs.writeFile(`${filePath}.txt`, output, 'utf8', cbk);
    break;
  }
  default:
    fs.writeFile(`${filePath}.json`, JSON.stringify(result, null, 2), 'utf8', cbk);
}
