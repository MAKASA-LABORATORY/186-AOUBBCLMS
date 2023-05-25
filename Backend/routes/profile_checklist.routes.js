const express = require("express");
const profile_checklist = express.Router();
//const cors = require("cors");
const db = require("../database/config");
//const csrf = require('csurf');
//const config = require('../database/config.json');

//const security = require('../database/security');

profile_checklist.post('/add', (req, res) => {
    db.sequelize.query("CALL sp_profile_checklist_add(:profile_id, :profile_type_id)", {
        replacements: {
            profile_id: req.body.profile_id,
            profile_type_id: req.body.profile_type_id,
        }
    }).then(data => {
        ret = data[0]["_ret"];
        if (ret === "add_successfully") {
            res.send({error: false, message: 'add_successfully'});
        } 
        else if (ret === "edit_successfully") {
            res.send({error: false, message: 'profile_checklist_updated_successfully'});
        } else if (ret === "invalid_profile_checklist_duplicate") {
            res.send({error: false, message: 'invalid_profile_checklist_duplicate'});
        }
        else {
            res.send({error: false, message: 'Unknown Error.'});
        }
    }).catch(err => {
        res.send({ error: true, message: `Error 767: ${err}` });
    });
});

module.exports = profile_checklist;