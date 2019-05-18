const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add',  (req, res ) => {
    res.render('gastos/add')
});

router.post('/add', async (req, res ) => {
   const { tienda, cantidad, description, fecha} =  req.body;
   const newLink = {
         tienda, 
        cantidad, 
        description,
        fecha
   };
   await pool.query('INSERT INTO gastos set ?', [newLink]);
   req.flash('success', 'Gasto registrado');
    res.redirect('/gastos');
});

router.get('/', async (req, res) =>{
    const gastos = await pool.query('SELECT * FROM gastos');
    res.render('gastos/list', { gastos });
});


router.get('/delete/:id', async (req, res) =>{
        const { id } = req.params;
        await pool.query('DELETE FROM gastos WHERE ID = ?', [id]);
        req.flash('success', 'Gasto Eliminado');
        res.redirect('/gastos');
});

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const gastos = await pool.query('SELECT * FROM gastos WHERE ID = ?', [id]);
    res.render('gastos/edit', {gastos: gastos[0]} );
});

router.post('/edit/:id', async (req, res ) => {
    console.log('hola')
    const {id} =  req.params;
    const { tienda, cantidad, description, fecha} =  req.body;
    const newLink = {
        tienda, 
        cantidad, 
        description,
        fecha
    };
    await pool.query('UPDATE gastos set ? WHERE id= ?',  [newLink, id]);
     req.flash('success', 'Gasto editado');
     res.redirect('/gastos');
 });


module.exports = router;