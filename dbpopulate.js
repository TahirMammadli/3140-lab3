const fs = require("fs");
const fastcsv = require("fast-csv");
const client = require("./database");


// this function takes in two arguments and prepopulates a table based on the parameters passed
function dbPopulate(caseVal, passedParam) {
  let query;
  let num = caseVal;
  let stream;
  switch (num) {
    case 1:
      query = "insert into appearance values ($1, $2, $3)";
      stream = fs.createReadStream("Appearance.csv");

      break;

    case 2:
      query = "insert into location values ($1, $2, $3, $4)";
      stream = fs.createReadStream("Location.csv");
      break;
    case 3:
      query =
        "insert into squirrel_sighting values ($1, $2, $3, $4, $5, $6, $7)";
      stream = fs.createReadStream(passedParam);
      break;

    default:
      break;
  }

  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();

      client.connect((err, client, done) => {
        if (err) throw err;

        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  stream.pipe(csvStream);
}
module.exports = dbPopulate;
