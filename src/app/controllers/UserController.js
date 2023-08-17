const User = require('../models/User');
const {mongooseToObject,multipleMongooseToObject} = require('../../util/mongoose')
const { check, validationResult } = require('express-validator');

class UserController {

    // [GET] /login
    login(req, res) {
        res.render('user/login');
    }

    // [POST] /login
    loginAuthen(req, res) {
        const formData = req.body;
        let uEmail = formData.email;
        let uPassword = formData.password;
        console.log(uEmail)
        console.log(uPassword)
        User.findOne({email:uEmail}).lean()
            .then(data => {
                if ((data.email == uEmail) && (data.password == uPassword)){
                    res.send('Successfull');
                }
                else {
                    res.render('user/login', { msgError: "Email or Password is wrong!" });
                }
            })
            .catch(err => {
                res.render('user/login', { msgError: "Can not found email!" });
            })
    }

    // [GET] /signup
    signup(req, res) {
        res.render('user/signup');
    }

    // [POST] /signup/store
    create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array();
            const pastData = req.body;
            res.render('user/signup', { lsterror: alert, pastData: pastData });
            return;
        }

        try {
            const formData = req.body;
            var email = formData.email;

            User.findOne({
                email: email
            })
                .then(data => {
                    if (data) {
                        const pastData = req.body;
                        res.render('user/signup', { msgError: "Email has been exist", pastData: pastData });
                    }
                    else {
                        const user = new User(formData);
                        user.save()
                            .then(() => {
                                res.send('success');
                            })
                    }
                })
                .catch(err => {
                    res.redirect('/')
                })
        } catch (error) {
            res.redirect('/')
        }


    }

    // [GET] /success
    success(req, res, next) {
        res.render('user/success', { title: 'Đăng kí thành công', path: "success", });
    }

}

module.exports = new UserController;