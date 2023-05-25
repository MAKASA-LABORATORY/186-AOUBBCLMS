const express = require("express");
const affiliation = express.Router();
//const cors = require("cors");
const db = require("../database/config");
//const csrf = require('csurf');
//const config = require('../database/config.json');

//const security = require('../database/security');

affiliation.post('/save', (req, res) => {
    db.sequelize.query("CALL sp_affiliation_save(:id, :affiliation_name)", {
        replacements: {
            id: parseInt(req.body.id),
            affiliation_name: req.body.affiliation_name,
        }
    }).then(data => {
        ret = data[0]["_ret"];
        if (ret === "add_successfully") {
            res.send({error: false, message: 'affiliation_add_successfully'});
        } 
        else if (ret === "edit_successfully") {
            res.send({error: false, message: 'affiliation_updated_successfully'});
        } else if (ret === "invalid_affiliation_name_duplicate") {
            res.send({error: false, message: 'invalid_affiliation_name_duplicate'});
        }
        else {
            res.send({error: false, message: 'Unknown Error.'});
        }
    }).catch(err => {
        res.send({ error: true, message: `Error 767: ${err}` });
    });
});

affiliation.get('/get_all', (req, res) => {
    db.sequelize.query('CALL sp_affiliation_get_all()', {
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


module.exports = affiliation;