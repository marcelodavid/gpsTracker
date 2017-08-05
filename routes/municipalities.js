const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        let municipalities = [{
            nombre: 'Municipalidad de Luque'
        }, {
            nombre: 'Municipalidad de San Lorenzo'
        }, {
            nombre: 'Municipalidad de Asuncion'
        }, {
            nombre: 'Municipalidad de MRA'
        }];
        res.json({
            data: municipalities
        });
    });

module.exports = router;
