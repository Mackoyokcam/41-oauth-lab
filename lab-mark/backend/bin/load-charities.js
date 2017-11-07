#!/usr/bin/env node
'use strict';

const jsonFile = process.argv[2];

const { exec } = require('child_process');
const loadJsonFile = `mongoimport --host localhost --db dev --collection charities --jsonArray ${jsonFile} `;

exec(loadJsonFile, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}: ${stderr.toString()}`);
    return;
  }
  console.log(`success ${stdout.toString()}`);
});
