const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json');


async function getSpreadsheet(spreadsheet, tab) {
    const doc = new GoogleSpreadsheet(spreadsheet);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[tab];

    return sheet;
}

module.exports = {getSpreadsheet};
