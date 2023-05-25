const express = require("express");
const profile = express.Router();
//const cors = require("cors");
const db = require("../database/config");
//const csrf = require('csurf');
//const config = require('../database/config.json');

//const security = require('../database/security');

profile.post('/add', (req, res) => {
    db.sequelize.query("CALL sp_profile_add( :name, :barangay_id, :age, :gender, :civil_status, :educational_attainment, :no_of_household_members, :annual_farm_income, :name_of_business, :business_address, :year_business_start, :contact_no, :business_status, :business_type, :initial_investment, :ave_annual_gross_income, :purok, @profile_id)", {
        replacements: {
            name: req.body.name,
            barangay_id: parseInt(req.body.barangay_id),
            age: req.body.age,
            gender: req.body.gender,
            civil_status: req.body.civil_status,
            educational_attainment: req.body.educational_attainment,
            no_of_household_members: req.body.no_of_household_members,
            annual_farm_income: req.body.annual_farm_income,
            name_of_business: req.body.name_of_business,
            business_address: req.body.business_address,
            year_business_start: req.body.year_business_start,
            contact_no: req.body.contact_no,
            business_status: req.body.business_status,
            business_type: req.body.business_type,
            initial_investment: req.body.initial_investment,
            ave_annual_gross_income: req.body.ave_annual_gross_income,
            purok: req.body.purok,
        }
    }).then((data) => {
        ret = data[0]["_ret"];
        profile_id = data[0]["_profile_id"];
        if (ret === "added_new_profile_successfully") {
            res.send({error: false, _ret: ret, _profile_id: profile_id});
        } 
        else if (ret === "updated_existing_profile_successfully") {
            res.send({error: false, _ret: ret, _profile_id: profile_id});
        }
        else {
            res.send({error: false, message: 'Unknown Error.'});
        }
    }).catch(err => {
        res.send({ error: true, message: `Error 767: ${err}` });
    });
});

profile.get('/get_all', (req, res) => {
    db.sequelize.query('CALL sp_profile_get()', {
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


module.exports = profile;