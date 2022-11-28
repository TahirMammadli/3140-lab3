const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");
const fastcsv = require("fast-csv");
const client = require("./database");

const dbPopulate = require("./dbpopulate");
console.log(process.argv.slice(2));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let processArgs = process.argv.slice(2);
app.listen(port, () => {
  console.log(process.argv.slice(2));
});


// PREPOPULATES THE DATABASE(WORKS FOR EACH TABLE)
app.get("/dbpopulate", (req, res) => {
  dbPopulate(3, process.argv.slice(2).toString());
});
// TO CREATE A SINGLE RECORD AND INSERT IT INTO THE SQUIRREL_SIGHTING TABLE
app.post("/create", (req, res) => {
  const {
    squirrel_sighting_id,
    color_key,
    activity,
    age,
    date,
    time,
    location_id,
  } = req.body;
  client.query(
    "insert into squirrel_sighting (squirrel_sighting_id, color_key, activity, age, date, time, location_id) values ($1, $2, $3, $4, $5, $6, $7)",
    [squirrel_sighting_id, color_key, activity, age, date, time, location_id]
  );
  console.log(req.body);
});

// OUTPUTS ALL VALUES FROM SQUIRREL_SIGHTING TABLE 
app.get("/read", (req, res) => {
  const response = client
    .query("select * from squirrel_sighting")
    .then((res) => console.log(res).catch((e) => console.log(e)));
});
// PUT METHOD TO DELETE RECORD(S) FROM SQUIRREL_SIGHTING TABLE
app.put("/update", (req, res) => {
  client.query(
    "update squirrel_sighting set activity = 'Racing', age = 'juvenile' where squirrel_sighting_id = 7"
  );
});
// DELETE METHOD TO DELETE RECORD(S) FROM SQUIRREL_SIGHTING TABLE
app.delete("/delete", (req, res) => {
  client.query("delete from squirrel_sighting where age = 'Juvenile'");
});
