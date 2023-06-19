if (!process.env.NETLIFY) {
  require('dotenv').config();
}

const { parse } = require('querystring');
const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_FROM_URL);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; 

  try {
    if (event.httpMethod === 'POST') {
      /* parse the string body into a useable JS object */
      const data = parse(event.body);
      await sheet.addRow(data);

      return {
        statusCode: 302,
        headers: {
          Location: '/success.html'
        }
      };
    } else {
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be POST'
      };
    }
  } catch (err) {
    console.error('error ocurred in processing ', event);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};