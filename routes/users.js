const express = require('express');
const router = express.Router();

router.route('/')
    .post((req, res) => {
        let json = req.body;
        console.log(json);
    });

// interactuamos con la base de datos de usuarios
router.route('/:user')
    .all((req, res, next) => {
        let param = req.params.user;
        let user = param[0].toUpperCase() + param.slice(1).toLowerCase();

        req.user = user;
        next();
    })
    .get((req, res) => {
        let user = req.user;
        console.log(user);
    })
    .put((req, res) => {
        console.log("actualizamos el usuario: ", req.user);
    })
    .delete((req, res) => {
        console.log("borramos el usuario: ", req.user);
    });

module.exports = router;
