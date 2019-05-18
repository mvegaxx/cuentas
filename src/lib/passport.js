const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers =  require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordFIeld: 'password',
    passReqCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?' , [username]);
    if (rows.length > 0){
        const user = rows[0];
        const validpass = await helpers.matchPassword(password, user.password);
        if(validpass){
            done(null, user, req.flash('Bienvenido' + user.username))
        }else {
            done(null, false, req.flash('contraseña incorrecta'))
        }
    } else {
        return done(null, false, req.flash('usuario no existe'))
    }
} ));



passport.use('local.signup', new LocalStrategy ({
    usernameFIeld: 'username',
    passwordFIeld: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname} = req.body;
    const newUer = {
        username, 
        password, 
        fullname
    };
   newUer.password = await helpers.encryptPassword(password);
   const result = await pool.query('INSERT INTO users SET ?', [newUer]);
   newUer.id = result.insertId;
   return done(null, newUer);

}));

 passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser( async(id, done) =>{
    const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows [0]);
});

