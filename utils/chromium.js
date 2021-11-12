/*******************************************************************************
    This file is part of FastForward, a browser extension to automatically skip
    annoying link shorteners.

    Repo: https://github.com/FastForwardTeam/FastForward
*/

'use strict';

/******************************************************************************/
const fs = require('fs');
const path = require('path');
const ChromeExtension = require('crx');
/******************************************************************************/

const crx = new ChromeExtension({
    codebase: 'https://cdn.jsdelivr.net/gh/FastForwardTeam/releases@main/update/FastForward.crx',
    privateKey: fs.readFileSync('./utils/key.pem')
});

var manifestLoc = './FastForward/build/FastForward.chromium/manifest.json';

let manifestJson = JSON.parse(fs.readFileSync(manifestLoc, 'utf8'));

manifestJson.update_url = 'https://cdn.jsdelivr.net/gh/FastForwardTeam/releases@main/update/update.xml'

var ver = fs.readFileSync('./utils/ver.txt').toString();
ver = ver.replace(/\n/g, '');
manifestJson.version = ver;

fs.writeFileSync(manifestLoc, JSON.stringify(manifestJson, null, 2));

crx.load( path.resolve(__dirname, '../FastForward/build/FastForward.chromium') )
    .then(crx => crx.pack())
    .then(crxBuffer => {
        const updateXML = crx.generateUpdateXML()

        fs.writeFileSync('./update/update.xml', updateXML);
        fs.writeFileSync('./update/FastForward.crx', crxBuffer);
        })
    .catch(err=>{
        console.error( err );
    });

console.log('\x1b[32m%s\x1b[0m', 'SUCCESS', `Packaged crx with version ${ver}`);
