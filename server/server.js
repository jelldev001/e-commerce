const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const morgan = require('morgan');
const {readdirSync} = require('fs');


// Middleware to parse JSON bodies
app.use(express.json({limit:'20mb'})); // การใช้ express.json() แทน body-parser
app.use(express.urlencoded({ extended: true  , limit:'20mb'}));
// Middleware to enable CORS
app.use(cors());
// Middleware for logging requests
app.use(morgan('dev')); 


readdirSync('./routes').map((file)=>{
    console.log(file);
    app.use('/api', require(`./routes/${file}`));
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});