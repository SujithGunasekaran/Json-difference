let express = require('express');
let path = require('path');
let cors = require('cors');
let dotenv = require('dotenv');
let app = express();

dotenv.config()

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.static('public'))
app.get('once', (request, response) => {
    response.sendFile(path.join(__dirname + '/public/index.html'))
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
    app.get('once', (request, response) => {
        response.sendFile(path.join(__dirname + '/public/index.html'))
    })
}

app.use(express.json())
app.use(cors())

