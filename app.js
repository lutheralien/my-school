const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const logger = require('morgan')
const env = require('dotenv')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override');
const sql = require('./database/mysql');

env.config();
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(methodOverride('_method'));
app.use(fileUpload({ 
}))

sql.connect();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const userRoutes = require('./routes/user')
const homeRoutes = require('./routes/home')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());




app.use('/user', userRoutes)
app.use('/', homeRoutes);


//Home Page
app.use(homeRoutes)

//port varible
const port = process.env.PORT 



app.listen(port, () => console.log(`Server running on Port ${port}`))