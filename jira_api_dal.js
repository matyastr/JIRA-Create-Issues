const fetch = require('node-fetch');
const { promisify } = require('util');
const Url = "https://jira.brandingbrand.com/rest/api/2/issue/";


function printRow(row) {
    console.log(`key: ${row.key}`);
    console.log(`summary: ${row.summary}`);
    console.log(`description: ${row.description}`);
    console.log(`issuetype: ${row.issuetype}`);
    console.log(`labels: ${row.labels}`);
    console.log('-------------------------');
}

async function printJiraInfo(sheet) {
    const rows = await promisify(sheet.getRows)({
        offset: 1
    });

    rows.forEach(row => {
        printRow(row);
    });
}

function createJiraTicket(row, authorization) { 
    const Data = {
        "fields": {
          "project": {
            "key": `${row.key}`
          },
          "summary": `${row.summary}`,
          "description": `${row.description}`,
          "issuetype": {
            "name": `${row.issuetype}`
          },
          "labels": [
            `${row.labels}`
          ]
        }
      };

    const otherParams = {
        headers: {
            Authorization: authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Data),
        method: "POST"
    };

    fetch(Url, otherParams)
    .then(data => {return data.json()})
    .then(res => {console.log(res)})
    .catch(error => console.log(error));
}

async function createJiraTickets(sheet) {
    const rows = await promisify(sheet.getRows)({
        offset: 1
    });

    rows.forEach(row => {
        createJiraTicket(row);
    });
}

module.exports = {createJiraTickets, printJiraInfo};
