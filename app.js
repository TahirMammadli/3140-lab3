const express = require('express')
const client = require('./database')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const fs = require("fs");
const fastcsv = require("fast-csv");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Hello World!")})
// app.get('/agents', (req, res) => {
//   client.query(`select * from class`, (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }else{
//         console.log(err.message);
//     }
//     client.end
// })
// })
// let file = "squirrel_data.csv"


// let stream = fs.createReadStream(file);
// let csvData = [];
/*let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();


    // save csvData
  


client.connect((err, client, done) => {
if (err) throw err;

try {
  csvData.forEach(row => {
    client.query(query, row, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("inserted " + res.rowCount + " row:", row);
      }
    });
  });
} catch(e)
{
  console.log(e)
}
});
});
stream.pipe(csvStream);
*/

//CRUD
// CREATE 
// READ 
// UPDATE 
// DELETE
let squirrel_data = {
  squirrel_sighting_id: "1",
  color_key: "Br",
  activity: "running",
  age: "juvenile",
  date: "2031-04-14",
  time: "15:51:24",
  location_id: "846970"
}

app.get('/create', (req, res) => {

   res.send('hello world')
  }
  
       
);
  

app.get('/read', (req, res) => {

})
app.put('/update', (req, res) => {

})
app.delete('/delete', (req, res) => {

})


