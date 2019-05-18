//defines con constantes los modulos que requieres
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqletore = require('express-mysql-session');
const passport = require('passport');

const{database} = require('./keys')

//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);//apunta al puerto 400 si no hay otro1

app.set('views', path.join(__dirname, 'views'));//le dice donde buscar
app.engine('hbs' , exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', 'hbs');

//middelwares
app.use(session({
    secret: 'cuentascasa',
    resave: false,
    saveUninitialized: false,
    store: mysqletore(database),
}))
app.use(flash());
app.use(morgan('dev'));//devuelve las peticiones del cliente
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Global Variables
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    next();
} );

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/gastos', require('./routes/gastos'));


//public
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
}); 
