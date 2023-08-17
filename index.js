const path = require('path');
const express = require('express')
const hbs  = require('express-handlebars');
const route = require('./src/routes')

const db = require('./src/config/db')
db.connect()

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname,'src','public')))

// Template Engine
app.engine('handlebars', hbs.engine({
    extname: ".hbs"
}));
app.set('view engine','handlebars')
app.set('views', path.join(__dirname,'src','resources','view'));


// Home Contact Bar

// Route Init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})