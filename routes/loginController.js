'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');

class LoginController {

    // POST /loginJWT
    async postLoginJWT(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = User.hashPassword(password);

        const user = await User.findOne({ email: email, password: hashedPassword });

        if(!user){
            // Respondemos que no son válidas las credenciales
            res.json({ success: false, error: __('INVALID_CREDENTIALS')});
            return;
        }

        // el usuario está y coincide la password 

        // creamos el token

        jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, (err, token) => {
            if(err){
                return next(err);
            }

            // respondemos con un JWT
            res.json({ success: true, token: token});

        });

    }

}

module.exports = new LoginController();