const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    // codigo para funcionar a engine do mustache
    let obj = {
        nome: 'Thiago',
        idade: 90,
        mostrar: true,
        ingredientes: [
            { nome: 'Arroz', qt: '20g' },
            { nome: 'Macarrão', qt: '100g' }
        ],
        interesses: ['node', 'js', 'css'],
        teste: '<strong>Testando negrito</strong>'
    }
    res.render('home', obj);
});

module.exports = router;