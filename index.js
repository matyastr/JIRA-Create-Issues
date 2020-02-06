const googleApiDal = require('./google_api_dal');
const jiraApiDal = require('./jira_api_dal');

const spreadsheetId = ''; //This is the main id found in the url of the Google sheets


googleApiDal.getSpreadsheet(spreadsheetId, 0)
  .then(spreadsheet => {
    jiraApiDal.createJiraTickets(spreadsheet);
  })
  .catch(ex => {
    return console.error(ex);
  });
