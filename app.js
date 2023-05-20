const express = require('express');


const app = express();



require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');


app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/src/views/index.html')
})





app.listen(process.env.port, () => {
    console.log('Server is running on port ' + process.env.port);
})
