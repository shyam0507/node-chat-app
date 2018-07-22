const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);


const express = require('express');
var app = express();

app.use(express.static(publicPath));


app.listen(PORT, () => {
    console.log("Server is up and running at port", PORT);
});