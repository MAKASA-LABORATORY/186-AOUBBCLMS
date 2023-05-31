const express = require("express");
const admins = express.Router();
//const cors = require("cors");
const db = require("../database/config");
//const csrf = require('csurf');
//const config = require('../database/config.json');

//const security = require('../database/security');

admins.post('/register', (req, res) => {
    db.sequelize.query("CALL sp_user_add(:name, :student_id, :department, :year_lvl, :address, :username, :password)", {
        replacements: {
            name: req.body.name,
            student_id: req.body.student_id,
            department: req.body.department,
            year_lvl: req.body.year_lvl,
            address: req.body.address,
            username: req.body.username,
            password: req.body.password,
        }
    }).then(data => {
        ret = data[0]["_ret"];
        if (ret === "add_successfully") {
            res.send({error: false, message: 'user_add_successfully'});
        } 
        else if (ret === "edit_successfully") {
            res.send({error: false, message: 'user_add_successfully'});
        }
         else if (ret === "invalid_username_name_duplicate") {
            res.send({error: false, message: 'duplicate_entry'});
        } 
        else {
            res.send({error: false, message: 'Unknown Error.'});
        }
    }).catch(err => {
        res.send({ error: true, message: `Error 767: ${err}` });
    });
});

admins.get('/login', (req, res) => {
    db.sequelize.query('CALL sp_user_login(:userName, :password)', {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: {
            userName: req.query.userName,
            password: req.query.password
        }
    }).then((data) => {
        const data_ret = db.MultiQueryResult(data);
        let details = data_ret.result0[0].hasOwnProperty('_ret') ? false : data_ret.result0;
        res.send(details ? details : 'No data found');
    }).catch(err => {
        res.send('No data found');
    });
});

admins.get('/get_all', (req, res) => {
    db.sequelize.query('CALL sp_admins_get_all()', {
        type: db.sequelize.QueryTypes.SELECT
    }).then((data) => {
        const data_ret = db.MultiQueryResult(data).result0;
        if (data_ret) {
            res.send(data_ret);
        } else {
            res.send(`no_data`);
        }
    }).catch(err => {
        res.send(`Error: ${err}`);
    });
});

module.exports = admins;